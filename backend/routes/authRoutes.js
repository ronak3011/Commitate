import express from 'express';
import { registerUser, loginUser, getMe, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/:id/profile', getUserProfile);

export default router;
