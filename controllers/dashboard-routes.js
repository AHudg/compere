const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score } = require("../models");
const withAuth = require("../utils/auth");

// gets all of the quizzes the user has taken

router.get("/", withAuth, (req, res) => {
  Quiz.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "title",
      "img_url",
      "description",
    ]
  })
  .then(dbQuizData => {

    const quizzes = dbQuizData.map((quiz) => quiz.get({ plain: true }));

    if (req.session.user_id) {
      res.render("dashboard", { quizzes, loggedIn: true });
    } else {
      res.render("dashboard", { quizzes });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.get('/edit/:id', (req, res) => {})
router.get("/edit/1", (req, res) => {
  res.render("edit-dashboard");
});

module.exports = router;
