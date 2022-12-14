const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score, Question } = require("../models");
const withAuth = require("../utils/auth");
const getFourQuizzes = require("../utils/homepageQuizes");
const { Op } = require("sequelize");
const { count } = require("../models/User");

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
  }).then((dbQuizData) => {
    const quizzes = dbQuizData.map((quiz) => quiz.get({ plain: true }));
    res.render("homepage", {
      quizzes,
      loggedIn: req.session.loggedIn,
    });
  });
});

router.get("/quiz/:id/edit/", (req, res) => {
  Quiz.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "img_url", "title", "description", "user_id"],
    include: [
      {
        model: Question,
      },
    ],
  })
    .then((dbQuizData) => {
      console.log(dbQuizData);
      if (!dbQuizData) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      const quiz = dbQuizData.get({ plain: true });

      res.render("edit-quiz", {
        quiz,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/quiz/:id/active", withAuth, (req, res) => {
  Question.findOne({
    where: {
      quiz_id: req.params.id,
    },
    attributes: ["question"],
  })
    .then((dbQuestionData) => {
      if (!dbQuestionData) {
        res.status(404).json({ message: "No quiz found with this id." });
        return;
      }
      // serializes data
      const question = dbQuestionData.get({ plain: true });

      res.render("active-quiz", { question, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// displays quiz based on id
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
      "user_id",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE quiz.id = vote.quiz_id)"
        ),
        "like_count",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM question WHERE quiz.id = question.quiz_id)"
        ),
        "total_questions",
      ],
    ],
    include: [
      {
        model: Score,
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbQuizData) => {
      console.log(dbQuizData);
      if (!dbQuizData) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      const quiz = dbQuizData.get({ plain: true });
      res.render("view-quiz", {
        quiz,
        loggedIn: req.session.loggedIn,
        isAuthor: quiz.user_id === req.session.user_id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/quiz/:id/leaderboard", withAuth, (req, res) => {
  Score.findAll({
    limit: 10,
    where: {
      quiz_id: req.params.id,
    },
    attributes: ["points"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    order: [["points", "DESC"]],
  })
    .then((dbScoreData) => {
      if (!dbScoreData) {
        res.status(404).json({ message: "No leaderboard found with this quiz id." });
        return;
      }
      const scores = dbScoreData.map((score) => score.get({ plain: true }));
      console.log(scores)
      res.render("leaderboard", { scores, completed: true, loggedIn: req.session.loggedIn });
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
