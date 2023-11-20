const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('ascend-capital', 'postgres', process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
