const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const admin = sequelize.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});

module.exports = admin;
