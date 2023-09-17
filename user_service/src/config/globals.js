const { Sequelize } = require('sequelize');
const path = require('path');

const envPath = path.join(__dirname, '/../../../.env');
require('dotenv').config({ path: envPath });

const db_url = process.env.USER_DATABASE_URL;

const sequelize = new Sequelize(db_url, {
    dialect: 'postgres',
});

module.exports = {
    sequelize
};
