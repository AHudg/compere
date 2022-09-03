const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Quiz, User, Like, Question } = require('../../models');
const sequelize = require('../../config/connection');
const { request, response } = require('express');

// shows all questions on the quiz
router.get('/quiz/:id/questions', withAuth, (req, res) => {
    Question.findAll()
        .then(dbQuestionData => res.json(dbQuestionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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
    })
        .then(dbQuestionData => {
            if (!dbQuestionData) {
                res.status(404).json({ message: 'No Question found with this id' });
                return;
            }
            res.json(dbQuestionData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//creates the quiz question

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
});

// updates the question
router.put('/quiz/:id/questions', withAuth, (req, res) => {
    Question.update(
        {
            question: req.body.question,
            answer: req.body.answers
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbQuestionData => {
            if (!dbQuestionData) {
                res.status(404).json({ message: "No question found with this id" });
                return;
            }
            res.json(dbQuestionData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.delete('/quiz/:id/questions', withAuth, (req, res) => {
    Question.destroy(
        {
            question: req.body.question,
            answer: req.body.answer
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbQuestionData => {
            if (!dbQuestionData) {
                res.status(404).json({ message: "No question found with this id" })
                return;
            }
            res.json(dbQuestionData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
