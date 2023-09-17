const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('./../config/globals.js');
class User extends Model {}

User.init({

    userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,   
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password:{
        type: DataTypes.STRING,
    } 

}, {sequelize, modelName: 'user'});

module.exports = User;
