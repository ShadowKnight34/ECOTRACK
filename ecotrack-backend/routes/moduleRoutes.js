// ──────────────────────────────────────────────
//  Module Routes — /api/modules
//  All routes are protected by authMiddleware.
// ──────────────────────────────────────────────

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const moduleController = require('../controllers/moduleController');

// Apply auth middleware to every route in this router
router.use(authMiddleware);

// GET /api/modules          → list all modules
router.get('/', moduleController.getAllModules);

// GET /api/modules/:id      → single module detail
router.get('/:id', moduleController.getModuleById);

// GET /api/modules/:id/quiz → quiz questions (no correctAnswer!)
router.get('/:id/quiz', moduleController.getQuizForModule);

module.exports = router;
