import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/postgres';

export const Project = sequelize.define('Project', {
  owner: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  stars: { type: DataTypes.INTEGER, allowNull: false },
  forks: { type: DataTypes.INTEGER, allowNull: false },
  issues: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.STRING, allowNull: false },
});
