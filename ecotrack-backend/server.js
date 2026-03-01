// ──────────────────────────────────────────────
//  EcoTrack Backend — Entry Point
// ──────────────────────────────────────────────

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health-check route ───────────────────────
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: '🌿 EcoTrack API is running',
        timestamp: new Date().toISOString(),
    });
});

// ── Route mounting ───────────────────────────
const authRoutes = require('./routes/authRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const quizRoutes = require('./routes/quizRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// ── Start server ─────────────────────────────
app.listen(PORT, () => {
    console.log(`🚀 EcoTrack server listening on http://localhost:${PORT}`);
});

module.exports = app;
