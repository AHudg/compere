const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score } = require("../models");
const withAuth = require("../utils/auth");

// gets all of the quizzes the user has taken

router.get("/", withAuth, (req, res) => {
  res.render("dashboard", { loggedIn: true });
  // console.log(req.session);
  // console.log("=================");
  // Quiz.findAll({
  //   where: {
  //     user_id: req.session.user_id,
  //   },
  //   attributes: [
  //     "id",
  //     "quiz_url",
  //     "title",
  //     "created_at"[
  //       // potentially questions?
  //       (sequelize.literal(
  //         "(SELECT COUNT(*) FROM like WHERE quiz.id = like.quiz_id"
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
  // });
});

// router.get('/edit/:id', (req, res) => {})
router.get("/edit/1", (req, res) => {
  res.render("edit-dashboard");
});

module.exports = router;
