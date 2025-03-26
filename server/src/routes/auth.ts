import { Router, Request, Response } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  await AuthController.register(req, res);
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  await AuthController.login(req, res);
});

export default router;
