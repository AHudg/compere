const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Quiz extends Model {
  static like(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      quiz_id: body.quiz_id,
    }).then(() => {
      return Quiz.findOne({
        where: {
          id: body.quiz_id,
        },
        attributes: [
          "id",
          "title",
          "description",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE quiz.id = vote.quiz_id)"
            ),
            "like_count",
          ],
        ],
      });
    });
  }
}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pt_score: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
      // quiz scores based off timer left is default, pt_score = true is scored based off points awared/subtracted
    },
    timer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 6000
      // default quiz is one minute long
    },
    add: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },
    deduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "quiz",
  }
);

module.exports = Quiz;
