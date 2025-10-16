import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/', authenticateJWT, getAnalytics);

export default router;
