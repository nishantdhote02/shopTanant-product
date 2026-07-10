const express = require("express");
const Sequelize = require("./config/db");

const cookieparser = require("cookie-parser");

// error middleware
const ErrorMiddleware = require("./middlewares/error.middleware");

//import routes
const AuthRoutes = require("./routes/user.routes");

require("./models/user.model");

const app = express();

app.use(express.json());
app.use(cookieparser());

const startServer = async () => {
  try {
    await Sequelize.authenticate();
    await Sequelize.sync({
      alter: true,
    });
    console.log("postgreSql is connected succesfully");
  } catch (error) {
    console.log("error in postgresql", error);
  }
};
startServer();

//routes

app.use("/api/auth", AuthRoutes);

// errro middleware use
app.use(ErrorMiddleware);

module.exports = app;
