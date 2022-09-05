const { Score } = require("../models");

const scoredata = [
  {
    user_id: 2,
    quiz_id: 1,
    points: 67,
  },
  {
    user_id: 2,
    quiz_id: 2,
    points: 0,
  },
  {
    user_id: 1,
    quiz_id: 2,
    points: 100,
  },
  {
    user_id: 1,
    quiz_id: 1,
    points: 33,
  },
  {
    user_id: 1,
    quiz_id: 3,
    points: 0,
  },
];

const seedScore = () => Score.bulkCreate(scoredata);

module.exports = seedScore;
