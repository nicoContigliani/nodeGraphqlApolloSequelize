'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, { through: models.RollUser });

    }
  }
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
    modelName: 'User',
  });
  return User;
};
// : { Role: ModelStatic<Model<any, any>>; RollUser: any; }