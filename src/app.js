const express = require("express");
const Sequelize = require("./config/db");

const cookieparser = require("cookie-parser");

// error middleware
const ErrorMiddleware = require("./middlewares/error.middleware");

//import routes
const AuthRoutes = require("./routes/user.routes");
const ProductRoutes= require("./routes/product.routes")
const CustomerRoutes= require("./routes/customer.routes")
const OrderRoutes= require("./routes/order.routes")


require("./models/user.model");

const app = express();

app.use(express.json());
app.use(cookieparser());

const startServer = async () => {
  try {
    await Sequelize.authenticate();
    console.log("Database connected successfully.");

    // Models import करें
    const { 
      Tenant, 
      User, 
      Customer, 
      Product, 
      Order, 
      OrderItem,
    } = require("./models/index");
    
    await Tenant.sync({ alter: true });
    await User.sync({ alter: true });
    await Customer.sync({ alter: true });
    await Product.sync({ alter: true });
    await Order.sync({ alter: true });

  } catch (error) {
    console.log("g Error in postgresql sync:", error);
  }
};
startServer();

//routes

app.use("/api/auth", AuthRoutes);

//
// 🚥 Mount New Shop Routes (For Testing)
app.use("/api/products", ProductRoutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/orders", OrderRoutes);
//

// errro middleware use
app.use(ErrorMiddleware);

module.exports = app;
