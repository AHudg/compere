const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Quiz, Question } = require("../../models");
const sequelize = require("../../config/connection");

// shows all questions on the quiz
router.get("/quiz/:id", withAuth, (req, res) => {
  Question.findAll({
    where: {
      quiz_id: req.params.id,
    },
  })
    .then((dbQuestionData) => res.json(dbQuestionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

<<<<<<< HEAD
//finds question by id 
router.get('/quiz/:id/questions', (req, res) => {
    Question.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'question',
            'answers'
        ],
        include: [
            {
                model: Quiz,
                attributes: ['title', 'description']
            }
        ]
=======
//finds question by id
/*
router.get("/quiz/:id", (req, res) => {
  Question.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "quetion", "answer1", "answer2", "answer3", "answer4"],

    include: [
      {
        model: Quiz,
        attributes: ["title", "description"],
      },
    ],
  })
    .then((dbQuestionData) => {
      if (!dbQuestionData) {
        res.status(404).json({ message: "No Question found with this id" });
        return;
      }
      res.json(dbQuestionData);
>>>>>>> f2bc9067662b1e060aa72243cbc9466ed25f7b07
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});*/

//creates the quiz question

<<<<<<< HEAD
router.post('/quiz/:id/questions', withAuth, (req, res) => {
    //expects question: "what does the fox say?", answer: "A. grr", "B. bark". "C. woof", "D. idk"
    Question.create({
        question: req.body.question,
        answer: req.body.answer
    })
        .then(dbQuestionData => res.json(dbQuestionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
=======
router.post("/quiz/:id", withAuth, (req, res) => {
  /*expects:    * fields in "()" are optional
    { question: "what does the fox say?",
     answer1: "grr",
     answer2: "bark",
     answer3:"woof",
     answer4: "idk",
     correct: "idk",
     ( "img_url" ): "https://media.wired.com/photos/59332718714b881cb296a076/master/pass/Screen-Shot-2013-09-06-at-11.52.17-AM.png" }*/
  Question.create({
    question: req.body.question,
    answer1: req.body.answer1,
    answer2: req.body.answer2,
    answer3: req.body.answer3,
    answer4: req.body.answer4,
    correct: req.body.correct,
    img_url: req.body.img_url,
    quiz_id: req.params.id,
  })
    .then((dbQuestionData) => res.json(dbQuestionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
>>>>>>> f2bc9067662b1e060aa72243cbc9466ed25f7b07
});

// updates the question
router.put("/:id", withAuth, (req, res) => {
  Question.update(
    {
      question: req.body.question,
      answer1: req.body.answer1,
      answer2: req.body.answer2,
      answer3: req.body.answer3,
      answer4: req.body.answer4,
      correct: req.body.correct,
      img_url: req.body.img_url,
      quiz_id: req.body.quiz_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbQuestionData) => {
      if (!dbQuestionData) {
        res.status(404).json({ message: "No question found with this id" });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Question.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbQuestionData) => {
      if (!dbQuestionData) {
        res.status(404).json({ message: "No question found with this id" });
        return;
      }
      res.json(dbQuestionData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
