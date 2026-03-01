// ──────────────────────────────────────────────
//  Quiz Controller — Auto-Grading Engine
// ──────────────────────────────────────────────

const pool = require('../config/db');
const processGamification = require('./gamificationEngine');

// ── POST /api/quizzes/submit ─────────────────
// Grades a quiz submission entirely on the server side.
// The frontend NEVER receives the answer key.
exports.submitQuiz = async (req, res) => {
    try {
        const { moduleID, answers } = req.body;
        const userID = req.user.userID;

        // 1 ── Validate input
        if (!moduleID || !Array.isArray(answers) || answers.length === 0) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'moduleID and a non-empty answers array are required.',
            });
        }

        // 2 ── Fetch correct answers from DB for this module
        const [correctRows] = await pool.query(
            'SELECT questionID, correctAnswer FROM QuizQuestion WHERE moduleID = ?',
            [moduleID]
        );

        if (correctRows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: `No quiz questions found for module ${moduleID}.`,
            });
        }

        // 3 ── Build a lookup map: questionID → correctAnswer
        const answerKey = {};
        correctRows.forEach((row) => {
            answerKey[row.questionID] = row.correctAnswer;
        });

        // 4 ── Grade the submission
        const totalQuestions = correctRows.length;
        let correctCount = 0;

        answers.forEach((answer) => {
            const correct = answerKey[answer.questionID];
            if (correct && answer.selectedOption.toUpperCase() === correct.toUpperCase()) {
                correctCount++;
            }
        });

        const score = Math.round((correctCount / totalQuestions) * 100);

        // 5 ── Save the attempt in QuizResult
        await pool.query(
            'INSERT INTO QuizResult (userID, moduleID, score) VALUES (?, ?, ?)',
            [userID, moduleID, score]
        );

        // 6 ── Trigger gamification processing
        await processGamification(userID, score);

        // 7 ── Return the result (never expose the answer key)
        return res.status(200).json({
            message: 'Quiz submitted successfully.',
            moduleID,
            totalQuestions,
            correctCount,
            score,
        });
    } catch (error) {
        console.error('submitQuiz error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to process quiz submission.',
        });
    }
};
