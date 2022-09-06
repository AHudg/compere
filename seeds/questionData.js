const { Question } = require("../models");

const questiondata = [
  {
    quiz_id: 1,
    question: "What is the name of the corporate supermarket in Stardew Valley",
    answer1: "Walmart",
    answer2: "JojaMart",
    answer3: "MegaMart",
    answer4: "Frank",
    correct: "JojaMart",
  },
  {
    quiz_id: 1,
    question: "What is the name of the town in Stardew Valley",
    answer1: "Pelican Town",
    answer2: "Ginger Town",
    answer3: "Stardew Valley",
    answer4: "Frank",
    correct: "Pelican Town",
    img_url: "https://stardewvalleywiki.com/mediawiki/images/4/43/Map.png",
  },
  {
    quiz_id: 1,
    question: "What are the creatures found in the community center called?",
    answer1: "Sprites",
    answer2: "Junimos",
    answer3: "Apples",
    answer4: "Frank",
    correct: "Junimos",
    img_url:
      "https://i.etsystatic.com/9694683/r/il/dc5ea9/1594443656/il_570xN.1594443656_nvma.jpg",
  },
  {
    quiz_id: 2,
    question: "What is the difference between a While and Do While loop?",
    answer1: "About 3 characters",
    answer2: "a do while will always run once",
    answer3: "a while loop checks at the end of the loop",
    answer4: "they are the same",
    correct: "a do while will always run once",
  },
  {
    quiz_id: 2,
    question: "How do you define a function in JavaScript?",
    answer1: "def myFunc()",
    answer2: "new myFunc()",
    answer3: "function myFunc()",
    answer4: "create myFunc()",
    correct: "function myFunc()",
  },
  {
    quiz_id: 3,
    question: "In fortnite how d",
    answer1: "wait go back",
    answer2: "how do i go back",
    answer3: "i meesd up",
    answer4: "how do i fix this?",
    correct: "wait go back",
  },
];

const seedQuestion = () => Question.bulkCreate(questiondata);

module.exports = seedQuestion;
