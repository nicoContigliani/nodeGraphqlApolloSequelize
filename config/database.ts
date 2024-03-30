import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'sports',
  username: 'root',
  password: 'postgres',
  port: 5432,
  dialect: 'postgres',
});

export default sequelize;