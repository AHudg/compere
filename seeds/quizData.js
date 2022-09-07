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
  {
    title: "Slime Rancher Quiz",
    description:
      "How much do you know about taking care of your slime friend's needs?",
    img_url:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/s/slime-rancher-plortable-edition-switch/hero",
    user_id: 3,
  },
  {
    title: "Minecraft Quiz",
    description: "Test your knowledge of the block game that refuses to die!",
    img_url:
      "https://assets-prd.ignimgs.com/2021/12/14/minecraft-1639513933156.jpg",
    user_id: 3,
  },
  {
    title: "Name that LoL Champion!",
    description:
      "Can you name all 161 champions in this quiz? You better at least try cuz this took a long time to make!",
    img_url:
      "https://www.leagueteamupdates.com/wp-content/uploads/2017/10/League-Of-Legends-Characters.jpg",
    user_id: 3,
  },
  {
    title: "Name that Food Item!",
    description:
      "Are you a master chef? Do you think you have what it takes to tell the difference between alfredo and ramen? Try this quiz and test your cooking knowledge!",
    img_url:
      "https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1608506169128-S6KYNEV61LEP5MS1UIH4/traditional-food-around-the-world-Travlinmad.jpg",
    user_id: 3,
  },
  {
    title: "The Ultimate Disney Trivia Quiz!",
    description:
      "Try this quiz and see if you know everything Disney!",
    img_url:
      "https://media.disneylandparis.com/d4th/en-usd/images/n037009_2029mar16_world_30-anniversary-fireworks-castle_16-9_tcm1861-233244.jpg",
    user_id: 3,
  },
  {
    title: "Name That Social Media!",
    description:
      "Are you a social media fanatic? Try this quiz to see if you identify the social media app.",
    img_url:
      "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/05/social-media-logos-on-cubes.jpg",
    user_id: 3,
  },
  {
    title: "General Trivia Quiz",
    description:
      "It's a general trivia quiz!",
    img_url:
      "https://media.istockphoto.com/vectors/trivia-word-made-with-colorful-hanging-letters-vector-id1303554344?k=20&m=1303554344&s=612x612&w=0&h=cT8WCC7JFrlNuJYPPuryWwmu9ldHNlfHSqGbDfJQzL4=",
    user_id: 3,
  },
];

const seedQuiz = () => Quiz.bulkCreate(quizdata);

module.exports = seedQuiz;