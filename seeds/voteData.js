const { Vote } = require("../models");

const votedata = [
  {
    user_id: 1,
    quiz_id: 2,
  },
  {
    user_id: 2,
    quiz_id: 1,
  },
  {
    user_id: 1,
    quiz_id: 1,
  },
  {
    user_id: 2,
    quiz_id: 3,
  },
  {
    user_id: 1,
    quiz_id: 5,
  },
  {
    user_id: 2,
    quiz_id: 5,
  },
  {
    user_id: 3,
    quiz_id: 5,
  },
  {
    user_id: 2,
    quiz_id: 8,
  },
  {
    user_id: 1,
    quiz_id: 7,
  },
];

const seedVote = () => Vote.bulkCreate(votedata);

module.exports = seedVote;
