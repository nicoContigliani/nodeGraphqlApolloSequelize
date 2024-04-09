import { Model, DataTypes } from 'sequelize';
 import sequelize from '../,,/../../../../config/database';
export interface RoleAttributes {
    name_role?: string,
    status_role?: boolean,
    description_role?: string
  
  }
class Role extends Model<RoleAttributes> 
  { 
 
public    name_role!: string;
public    status_role!: boolean;
public    description_role!: string
 
   static associate(models:any) {
// define association here
    })}}
Role.init({
name_role: DataTypes.STRING,
status_role: DataTypes.BOOLEAN,
description_role: DataTypes.STRING
  }, {
sequelize,
timestamps: false ,
tableName:'roles',
modelName: 'Role',
  } )
export default Role;