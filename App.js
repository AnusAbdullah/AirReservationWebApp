const express = require("express");
const userRoute = require("./Routes/customer");
const sequelize = require("./Db/connect");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs"); // set the view engine to ejs

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use("/", userRoute);

const port = 3000;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to db...");
    await sequelize.sync({ force: false });
    app.listen(port, () => {
      console.log(`server listening on port http://localhost:${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
