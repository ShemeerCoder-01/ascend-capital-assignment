const {DataTypes} = require('sequelize');
const sequelize = require('../dbConnection/dbConnection');
 
const List = sequelize.define('List',{
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    items:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
    }
});

module.exports = List;