import express from 'express';
import { getProjects, getProjectById, createProject, deleteProject, getMyProjects, updateProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Private routes (Require the user to be logged in, so we use 'protect')
router.post('/', protect, createProject);
router.get('/my-projects', protect, getMyProjects);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

// Public routes (Anyone can access)
router.get('/', getProjects);
router.get('/:id', getProjectById);

export default router;
