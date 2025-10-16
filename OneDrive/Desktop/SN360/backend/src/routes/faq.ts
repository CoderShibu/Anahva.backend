import { Router } from 'express';
import { getFAQs, updateFAQ } from '../controllers/faqController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/', getFAQs);
router.patch('/:id', authenticateJWT, updateFAQ);

export default router;
