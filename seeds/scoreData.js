const { Score } = require("../models");

const scoredata = [
  {
    user_id: 2,
    quiz_id: 1,
    score: 67,
  },
  {
    user_id: 2,
    quiz_id: 2,
    score: 0,
  },
  {
    user_id: 1,
    quiz_id: 2,
    score: 100,
  },
  {
    user_id: 1,
    quiz_id: 1,
    score: 33,
  },
  {
    user_id: 1,
    quiz_id: 3,
    score: 0,
  },
];

const seedScore = () => Score.bulkCreate(scoredata);

module.exports = seedScore;
