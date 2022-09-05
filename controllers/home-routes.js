const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score } = require("../models");

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

// router.get("/quiz/:id", (req, res) => {
router.get("/quiz/1", (req, res) => {
  res.render("view-quiz");
  // Quiz.findOne({
  //   where: {
  //     id: req.params.id,
  //   },
  //   attributes: [
  //     "id",
  //     "quiz_url",
  //     "title",
  //     "created_at"[
  //       // potentially questions?
  //       (sequelize.literal(
  //         "(SELECT COUNT(*) FROM vote WHERE quiz.id = vote.quiz_id"
  //       ),
  //       "like_count")
  //     ],
  //   ],
  //   include: [
  //     {
  //       model: Score,
  //       include: {
  //         model: User,
  //         attributes: [""],
  //       },
  //     },
  //   ],
  // })
  //   .then((dbQuizData) => {
  //     if (!dbQuizData) {
  //       res.status(404).json({ message: "No user found with this id." });
  //       return;
  //     }
  //     const quiz = dbQuizData.get({ plain: true });
  //     if (req.session.account_id) {
  //       res.render("view-quiz", { quiz, loggedIn: true });
  //     } else {
  //       res.render("view-quiz", { quiz });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
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
