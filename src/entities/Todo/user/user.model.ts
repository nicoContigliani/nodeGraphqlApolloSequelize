import { Model, DataTypes } from 'sequelize';
 import sequelize from '../,,/../../../../config/database';
export interface UserAttributes {
    email?: string,
    password?: string,
    fullname?: string,
    phone?: string,
    birthday?: Date,
    Score?: number,
    status_user?: boolean
  
  }
class User extends Model<UserAttributes> 
  { 
 
public    email!: string;
public    password!: string;
public    fullname!: string;
public    phone!: string;
public    birthday!: Date;
public    Score!: number;
public    status_user!: boolean
 
   static associate(models:any) {
// define association here
User.belongsToMany(models.Role, { through: models.RollUser })}}
User.init({
email: DataTypes.STRING,
password: DataTypes.STRING,
fullname: DataTypes.STRING,
phone: DataTypes.STRING,
birthday: DataTypes.DATE,
Score: DataTypes.BIGINT,
status_user: DataTypes.BOOLEAN
  }, {
sequelize,
timestamps: false ,
tableName:'users',
modelName: 'User',
  } )
export default User;