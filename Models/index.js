const User = require("./User");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Score = require("./Score");
const Vote = require("./Vote");

User.hasMany(Quiz, {
  foreignKey: "user_id",
});
Quiz.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Quiz, {
  through: Vote,
  as: "liked_quizes",
  foreignKey: "user_id",
});
Quiz.belongsToMany(User, {
  through: Vote,
  as: "like_count",
  foreignKey: "quiz_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Vote, {
  foreignKey: "user_id",
});

Vote.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});
Quiz.hasMany(Vote, {
  foreignKey: "quiz_id",
});

Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});
Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
});

Score.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});
Quiz.hasOne(Score, {
  foreignKey: "quiz_id",
});

User.hasMany(Score, {
  foreignKey: "user_id",
});

Score.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { Question, Quiz, User, Vote, Score };