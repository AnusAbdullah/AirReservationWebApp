const Sequelize = require("sequelize");

const sequelize = new Sequelize("Airline_Reservation_System", "root", "anas", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
