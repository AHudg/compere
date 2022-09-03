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
];

const seedVote = () => Vote.bulkCreate(votedata);

module.exports = seedVote;
