const User = require("./User");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Score = require("./Score");
const Vote = require("./Vote");

User.hasMany(Quiz, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Quiz.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.belongsToMany(Quiz, {
  through: Vote,
  as: "liked_quizes",
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Quiz.belongsToMany(User, {
  through: Vote,
  as: "like_count",
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
User.hasMany(Vote, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Vote.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});
Quiz.hasMany(Vote, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});

Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});
Quiz.hasMany(Question, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});

Score.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});

Quiz.hasOne(Score, {
  foreignKey: "quiz_id",
  onDelete: "CASCADE",
});

User.hasMany(Score, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Score.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { Question, Quiz, User, Vote, Score };
