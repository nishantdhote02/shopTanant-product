const { DataTypes } = require("sequelize");
const Sequelize = require("../config/db");

const User = Sequelize.define("User", {
  tenantId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
});

module.exports = User;
