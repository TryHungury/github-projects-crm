// controllers/AuthController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { createToken } from '../utils/jwt';

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashedPassword });
      res.status(201).json({ id: user._id, email: user.email });
    } catch (error) {
      res.status(400).json({ error: 'User already exists or invalid data' });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = createToken(user._id.toString());
    res.json({ token });
  }
}
