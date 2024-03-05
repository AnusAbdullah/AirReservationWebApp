const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const airlines = sequelize.define("airlines", {
  id: {
    type: Sequelize.STRING(10),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});

module.exports = airlines;
