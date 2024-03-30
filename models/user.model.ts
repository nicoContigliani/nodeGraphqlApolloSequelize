import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // ... (relaciones con otros modelos)
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
});

export default User;