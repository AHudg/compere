const router = require("express").Router();
const sequelize = require("../config/connection");
const { Quiz, User, Vote, Score } = require("../models");
const withAuth = require("../utils/auth");

// gets all of the quizzes the user has taken

router.get("/", withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ['id','username','email','created_at'],
    include: [
      {
        model: Quiz,
        attributes: ["id", "title", "img_url", "description"],
      },
      {
        model: Quiz,
        attributes: ["title"],
        through: Vote,
        as: "liked_quizes",
      },
      {
        model: Score,

        attributes: ["points"],
        include: [
          {
            model: Quiz,
            attributes: ["title"],
          },
        ],
      },
    ],
  })
  .then(dbUserData => {
    const userInfo = dbUserData.get({ plain: true });

    console.log(userInfo);

    if (req.session.user_id) {
      res.render("dashboard", { userInfo, loggedIn: true });
    } else {
      res.render("dashboard", { userInfo });
    }

  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/edit/', withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: [
      "username",
      "email",
      "password"
    ]
  })
  .then(dbQuizData => {

    const userInfo = dbQuizData.get({ plain: true });

    if (req.session.user_id) {
      res.render("edit-dashboard", { userInfo, loggedIn: true });
    } else {
      res.render("edit-dashboard", { userInfo });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
})

module.exports = router;
