import express from 'express';
import { analyzeProject } from '../controllers/aiController.js';

const router = express.Router();

// @route   GET /api/ai/analyze/:projectId
// @desc    Analyze a project with AI
// @access  Public
router.get('/analyze/:projectId', analyzeProject);

export default router;
