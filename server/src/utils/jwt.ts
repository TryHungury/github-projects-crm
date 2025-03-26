import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const createToken = (id: string) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET);
