const { DataTypes } = require("sequelize");

const Withtenant = (schema, options = {}) => {
  return {
    ...schema,
    tenantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "tenants",
        key: "id",
      },
    },
  };
};

module.exports = Withtenant;
