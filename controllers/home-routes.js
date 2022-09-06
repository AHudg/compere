const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score, Question } = require("../models");
const withAuth = require('../utils/auth');

// Cannot use withAuth here because you need to be able to be routed to the
// homepage initially upon URL entry so that you can click the login button
// instead, I check for authentication on line 39
router.get("/", (req, res) => {
  Quiz.findAll({
    attributes: ["id", "title", "img_url", "description"],
  })
    .then((dbQuizData) => {
      // serializes the data and returns an array
      // of each quiz w/ properties of queried attributes
      const quizzes = dbQuizData.map((quiz) => quiz.get({ plain: true }));

      if (req.session.user_id) {
        // second arguement of res.render should be an object
        //containing the data you wish to display in the templates
        res.render("homepage", { quizzes, loggedIn: true });
      } else {
        res.render("homepage", { quizzes });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/quiz/:id", (req, res) => {
  Quiz.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "img_url", "description", "user_id"],
  })
    .then((dbQuizData) => {
      if (!dbQuizData) {
        res.status(404).json({ message: "No quiz found with this id." });
        return;
      }

      // serializes data
      const quiz = dbQuizData.get({ plain: true });

      if (req.session.user_id) {
        res.render("view-quiz", { quiz, loggedIn: true });
      } else {
        res.render("view-quiz", { quiz });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/quiz/:id/active', withAuth, (req, res) => {
  Question.findOne({
    where: {
      quiz_id: req.params.id
    },
    attributes: ['question']
  })
  .then(dbQuestionData => {
    if (!dbQuestionData) {
      res.status(404).json({ message: "No quiz found with this id." });
      return;
    }
    // serializes data
    const question = dbQuestionData.get({ plain: true });

    res.render("active-quiz", { question, loggedIn: true });

  })
  .catch((err) => {
  console.log(err);
  res.status(500).json(err);
  });
})

router.get('/quiz/:id/leaderboard', withAuth, (req, res) => {
    res.render("leaderboard");
})

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

module.exports = router;
