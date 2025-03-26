import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/github_crm';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
});

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected');
    await sequelize.sync();
  } catch (error) {
    console.error('❌ PostgreSQL connection failed', error);
  }
};
