const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const sales = sequelize.define("sales", {
  id: {
    type: Sequelize.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  departure: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  arrival: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  passenger: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
});

module.exports = sales;
