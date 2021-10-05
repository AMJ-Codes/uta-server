const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:Adrians1dad@localhost:5432/uta-server");

module.exports = db;