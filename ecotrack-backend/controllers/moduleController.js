// ──────────────────────────────────────────────
//  Module Controller — SDG Content Delivery
// ──────────────────────────────────────────────

const pool = require('../config/db');

// ── GET /api/modules ─────────────────────────
// Returns a summary list of all available modules.
exports.getAllModules = async (req, res) => {
    try {
        const [modules] = await pool.query(
            'SELECT moduleID, title, category FROM Module'
        );

        return res.status(200).json(modules);
    } catch (error) {
        console.error('getAllModules error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve modules.',
        });
    }
};

// ── GET /api/modules/:id ─────────────────────
// Returns full details for a single module.
exports.getModuleById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM Module WHERE moduleID = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Not Found',
                message: `Module with ID ${id} not found.`,
            });
        }

        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('getModuleById error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve module.',
        });
    }
};

// ── GET /api/modules/:id/quiz ────────────────
// Returns quiz questions for a module.
// ⚠️  correctAnswer is intentionally OMITTED to prevent cheating.
exports.getQuizForModule = async (req, res) => {
    try {
        const { id } = req.params;

        const [questions] = await pool.query(
            `SELECT questionID, moduleID, questionText,
              optionA, optionB, optionC, optionD
       FROM QuizQuestion
       WHERE moduleID = ?`,
            [id]
        );

        return res.status(200).json(questions);
    } catch (error) {
        console.error('getQuizForModule error:', error.message);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Failed to retrieve quiz questions.',
        });
    }
};
