const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    offset: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Comments;