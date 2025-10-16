import { Router } from 'express';
import { getUsers, updateUser, deleteUser } from '../controllers/userController';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/', authenticateJWT, getUsers);
router.patch('/:id', authenticateJWT, updateUser);
router.delete('/:id', authenticateJWT, deleteUser);

export default router;
