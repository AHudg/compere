const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.ARRAY(sequelize.STRING),
      allowNull: false,
      validate: {
        len: [4],
      },
    },
    /*answer2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer4: {
      type: DataTypes.STRING,
      allowNull: false,
    },*/
    correct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // foreign key pointing to answers?
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "question",
  }
);

module.exports = Question;
