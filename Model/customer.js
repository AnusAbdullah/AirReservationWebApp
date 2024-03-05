const Sequelize = require("sequelize");
const sequelize = require("../Db/connect");

const customers = sequelize.define("customers", {
  cid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  cname: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  cemail: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  cpassword: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  caddress: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

module.exports = customers;
