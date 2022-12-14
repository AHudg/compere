const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Quiz, Question, User, Vote, Score } = require("../../models");
const sequelize = require("../../config/connection");
// displays all quizzes
router.get("/", (req, res) => {
  Quiz.findAll()
    .then((dbQuizData) => res.json(dbQuizData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// finds a certain quiz
router.get("/:id", (req, res) => {
  Quiz.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "img_url",
      "title",
      "description",
      // 'questions'
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE quiz.id = vote.quiz_id)"
        ),
        "like_count",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbQuizData) => {
      if (!dbQuizData) {
        res.status(404).json({ message: "No quiz found with this id" });
        return;
      }
      res.json(dbQuizData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// finds the top 10 scores for the quiz
router.get("/:id/leaderboard", (req, res) => {
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
    .then((dbQuizData) => {
      if (!dbQuizData) {
        res.status(404).json({ message: "No quiz found with this id" });
        return;
      }
      res.json(dbQuizData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creates a new quiz
router.post("/", (req, res) => {
  //expects {title: 'Ultimate Stardew Valley Quiz', question:'Who is this character', answer: 'A. Harvey' }
  Quiz.create({
    title: req.body.title,
    img_url: req.body.img_url, // honestly not sure if that works / would work without
    description: req.body.description,
    user_id: req.session.user_id, // user_id: req.session.user_id,
  })
    .then((dbQuizData) => res.json(dbQuizData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// submit a score for a quiz
router.post("/:id/scores", (req, res) => {
  Score.create({
    quiz_id: req.params.id,
    user_id: req.session.user_id,
    points: req.body.points,
  })
    .then((dbQuizData) => res.json(dbQuizData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// lets the user like or unlike a quiz
router.put("/like", withAuth, (req, res) => {
  // checks if the user already liked the quiz
  Vote.findOne({
    where: {
      quiz_id: req.body.quiz_id,
      user_id: req.session.user_id,
    },
  })
    .then((dbVoteData) => {
      // if not, like it
      if (!dbVoteData) {
        Quiz.like(
          { ...req.body, user_id: req.session.user_id },
          { Vote, Quiz, User }
        )
          .then((updatedVoteData) => res.json(updatedVoteData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        return;
      }
      // if so delete the like
      else {
        Vote.destroy({
          where: {
            id: dbVoteData.id,
          },
        }).catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// updates the quiz
router.put("/:id", withAuth, (req, res) => {
  Quiz.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbQuizData) => {
      if (!dbQuizData) {
        res.status(404).json({ message: "No quiz found with this id" });
        return;
      }
      res.json(dbQuizData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// deletes the quiz/ questions
router.delete("/:id", withAuth, (req, res) => {
  Quiz.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbQuizData) => {
      if (!dbQuizData) {
        res.status(404).json({ message: "No quiz found with this id" });
        return;
      }
      res.json(dbQuizData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;