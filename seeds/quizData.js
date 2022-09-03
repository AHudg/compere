const { Quiz } = require("../models");

const quizdata = [
  {
    title: "Stardew Valley Quiz",
    description: "How well do you know Stardew Valley?",
    user_id: 1,
  },
  {
    title: "Javascript Quiz",
    description: "Test your knowledge of javascript principles",
    user_id: 1,
  },
  {
    title: "Fortnite Quiz",
    description: "Fortnite is cool adn i lik it.",
    img_url:
      "https://cdn2.unrealengine.com/12br-delay-social-news-header-02-1920x1080-119208936.jpg",
    user_id: 2,
  },
];

const seedQuiz = () => Quiz.bulkCreate(quizdata);

module.exports = seedQuiz;
