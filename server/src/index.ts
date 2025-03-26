import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './utils/mongo';
import { connectPostgres } from './utils/postgres';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'CRM Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

connectMongo();
connectPostgres();
