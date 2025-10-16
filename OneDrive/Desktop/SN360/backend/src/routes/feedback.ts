import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, submitFeedback);

export default router;
