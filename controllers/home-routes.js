const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score } = require("../models");
const getFourQuizzes = require("../utils/homepageQuizes");

// Cannot use withAuth here because you need to be able to be routed to the
// homepage initially upon URL entry so that you can click the login button
// instead, I check for authentication on line 39
router.get("/", (req, res) => {
  Quiz.count() // get total # of quizzes
    .then((numQuizzes) => {
      // randomly select 4 quizzes from that list
      return getFourQuizzes(numQuizzes);
    })
    .then((displayQuizzes) => {
      // then get the data tied to those quizzes
      return Quiz.findAll({
        where: {
          id: displayQuizzes,
        },
        attributes: [
          "id",
          "img_url",
          "title",
          "description",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE quiz.id = vote.quiz_id)"
            ),
            "like_count",
          ],
        ],
      });
    })
    .then((dbQuizData) => {
      const quizzes = dbQuizData.map((quiz) => quiz.get({ plain: true }));
      console.log(quizzes);
      res.render("homepage", {
        quizzes,
        loggedIn: req.session.loggedIn,
      });
    });
});

router.get("/quiz/:id", (req, res) => {
  Quiz.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "img_url",
      "title",
      "description",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE quiz.id = vote.quiz_id)"
        ),
        "like_count",
      ],
    ],
    include: [
      {
        model: Score,
        include: {
          model: User,
          attributes: [""],
        },
      },
    ],
  })
    .then((dbQuizData) => {
      if (!dbQuizData) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      const quiz = dbQuizData.get({ plain: true });
      res.render("view-quiz", {
        quiz,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

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
