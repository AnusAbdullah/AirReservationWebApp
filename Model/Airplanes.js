const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const airplanes = sequelize.define("airplanes", {
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
  time: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = airplanes;
