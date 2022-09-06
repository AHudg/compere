const { Quiz } = require("../models");

const quizdata = [
  {
    title: "Stardew Valley Quiz",
    description: "How well do you know Stardew Valley?",
    pt_score: true,
    timer: 20,
    add: 6,
    deduct: 3,
    user_id: 1,
  },
  {
    title: "Javascript Quiz",
    description: "Test your knowledge of javascript principles",
    pt_score: false,
    timer: 20,
    add: 5,
    deduct: 10,
    user_id: 1,
  },
  {
    title: "Fortnite Quiz",
    description: "Fortnite is cool adn i lik it.",
    pt_score: false,
    timer: 20,
    add: 5,
    deduct: 10,
    img_url:
      "https://cdn2.unrealengine.com/12br-delay-social-news-header-02-1920x1080-119208936.jpg",
    user_id: 2,
  },
  {
    title: "Slime Rancher Quiz",
    description:
      "How much do you know about taking care of your slime friend's needs?",
    pt_score: false,
    timer: 20,
    add: 5,
    deduct: 10,
    img_url:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/s/slime-rancher-plortable-edition-switch/hero",
    user_id: 3,
  },
  {
    title: "Minecraft Quiz",
    description: "Test your knowledge of the block game that refuses to die!",
    pt_score: false,
    timer: 20,
    add: 5,
    deduct: 10,
    img_url:
      "https://assets-prd.ignimgs.com/2021/12/14/minecraft-1639513933156.jpg",
    user_id: 3,
  },
  {
    title: "Name that LoL Champion!",
    description:
      "Can you name all 161 chamions in this quiz? You better at least try cuz this took a long time to make!",
    pt_score: false,
    timer: 20,
    add: 5,
    deduct: 10,
    img_url:
      "https://www.leagueteamupdates.com/wp-content/uploads/2017/10/League-Of-Legends-Characters.jpg",
    user_id: 3,
  },
];

const seedQuiz = () => Quiz.bulkCreate(quizdata);

module.exports = seedQuiz;
