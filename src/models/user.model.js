const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");
const Withtenant = require("./withTenant");

const User = Sequelize.define(
  "User",
  Withtenant({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    sellerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sellerEmail: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
);
module.exports = User;
