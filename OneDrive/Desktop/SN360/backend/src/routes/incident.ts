import { Router } from 'express';
import { createIncident, getIncidents, updateIncident } from '../controllers/incidentController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, createIncident);
router.get('/', authenticateJWT, getIncidents);
router.patch('/:id', authenticateJWT, updateIncident);

export default router;
