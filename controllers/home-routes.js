const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score } = require("../models");
const getFourQuizzes = require("../utils/homepageQuizes");
const { Op } = require("sequelize");

// Cannot use withAuth here because you need to be able to be routed to the
// homepage initially upon URL entry so that you can click the login button
// instead, I check for authentication on line 40
router.get("/", (req, res) => {
  // get total # of quizzes
  Quiz.count()
    // randomly select 4 quizzes from that list
    .then((numQuizzes) => {
      return getFourQuizzes(numQuizzes);
    })
    // then get the data tied to those quizzes ...
    .then((displayQuizzes) => {
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
    // ... and send it to the user
    .then((dbQuizData) => {
      const quizzes = dbQuizData.map((quiz) => quiz.get({ plain: true }));
      res.render("homepage", {
        quizzes,
        loggedIn: req.session.loggedIn,
      });
    });
});

// get quizzes from searchbar
router.get("/search/:name", (req, res) => {
  Quiz.findAll({
    where: {
      title: { [Op.like]: `%${req.params.name}%` },
    },
  }).then((dbQuizData) => {
    const quizzes = dbQuizData.map((quiz) => quiz.get({ plain: true }));
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
