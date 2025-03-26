import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, ProjectController.getProjects);
router.post('/', authenticateToken, ProjectController.addProject);
router.delete('/:id', authenticateToken, ProjectController.deleteProject);

export default router;
