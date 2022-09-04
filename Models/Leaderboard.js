const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Leaderboard extends Model {}

Leaderboard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    score_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "score",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "leaderboard",
  }
);

module.exports = Leaderboard;
