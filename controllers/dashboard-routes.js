const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score } = require("../models");
const withAuth = require("../utils/auth");

// gets all of the quizzes the user has taken

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("=================");
  Quiz.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "img_url",
      "title",
      "description"[
        // potentially questions?
        (sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE quiz.id = vote.quiz_id"
        ),
        "like_count")
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
    ],
  });
});

module.exports = router;
