const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://PostgreSQL_14:Adrians1dad@localhost:5433/");

module.exports = db;