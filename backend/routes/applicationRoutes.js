import express from 'express';
import { createApplication, getReceivedApplications, getSentApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All application routes require the user to be logged in
router.use(protect);

router.post('/', createApplication);
router.get('/received', getReceivedApplications);
router.get('/sent', getSentApplications);
router.put('/:id', updateApplicationStatus);

export default router;
