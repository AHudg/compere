const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Like, Score } = require("../models");
const withAuth = require("../utils/auth");

// gets all of the quizzes the user has taken

router.get("/", (req, res) => {
  res.render("dashboard");
  // router.get("/", withAuth, (req, res) => {
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

module.exports = router;
