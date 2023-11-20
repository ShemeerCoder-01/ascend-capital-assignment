const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnection/dbConnection'); // Import the Sequelize instance

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
