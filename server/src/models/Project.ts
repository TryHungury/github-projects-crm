import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/postgres';

export class Project extends Model {}

Project.init(
  {
    owner: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    forks: DataTypes.INTEGER,
    issues: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Project',
  },
);
