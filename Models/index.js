const User = require("./User");
const Quiz = require("./Quiz");
const Question = require("./Question");
const Score = require("./Score");
const Leaderboard = require("./Leaderboard");
const Like = require("./Like");

User.hasMany(Quiz, {
  foreignKey: "user_id",
});
Quiz.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Quiz, {
  through: Like,
  as: "liked_quizs",
  foreignKey: "user_id",
});
Quiz.belongsToMany(User, {
  through: Like,
  as: "liked_quizs",
  foreignKey: "quiz_id",
});

Like.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Like, {
  foreignKey: "user_id",
});

Like.belongsTo(Quiz, {
  foreignKey: "quiz_id",
});
Quiz.hasMany(Like, {
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

User.belongsToMany(Score, {
  through: Leaderboard,
  as: "user_scores",
  foreignKey: "user_id",
});

Score.belongsToMany(User, {
  through: Leaderboard,
  as: "user_scores",
  foreignKey: "user_id",
});

Leaderboard.belongsTo(Score, {
  foreignKey: "score_id",
});
Score.hasMany(Leaderboard, {
  foreignKey: "score_id",
});

Leaderboard.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Leaderboard, {
  foreignKey: "user_id",
});

module.exports = { Question, Quiz, User, Leaderboard, Like, Score };
