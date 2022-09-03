const sequelize = require("../config/connection");
const seedQuestion = require("./questionData");
const seedQuiz = require("./quizData");
const seedScore = require("./scoreData");
const seedUser = require("./userData");
const seedVote = require("./voteData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();
  await seedQuiz();
  await seedQuestion();
  await seedScore();
  await seedVote();

  process.exit(0);
};

seedAll();
