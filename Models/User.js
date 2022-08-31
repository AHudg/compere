const { Model, DataTypes } = require("sequelize");
const sequelize = requeire("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
  // password validate go here
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
