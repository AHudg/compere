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
    points: {
      // personally i'd like to rename it score but i'll follow the table for now
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: "quiz",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "leaderboard",
  }
);

module.exports = Leaderboard;
