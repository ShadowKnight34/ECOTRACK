// ──────────────────────────────────────────────
//  Leaderboard Routes — /api/leaderboard
//  Protected by authMiddleware.
// ──────────────────────────────────────────────

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const leaderboardController = require('../controllers/leaderboardController');

// Apply auth middleware
router.use(authMiddleware);

// GET /api/leaderboard → top 50 by XP
router.get('/', leaderboardController.getLeaderboard);

module.exports = router;
