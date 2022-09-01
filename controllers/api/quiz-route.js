const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Quiz, User, Like } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Quiz.findAll()
        .then(dbQuizData => res.json(dbQuizData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
    Quiz.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'), 'like_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbQuizData => {
            if (!dbQuizData) {
                res.status(404).json({ message: 'No quiz found with this id' });
                return;
            }
            res.json(dbQuizData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.create('/', withAuth, (req, res) => {
    //expects {title: 'Ultimate Stardew Valley Quiz', question:'Who is this character', answer: 'A. Harvey' }
    Quiz.create({
        title: req.body.title,
        question: req.body.question,
        answer: req.body.answer
    })
        .then(dbQuizData => res.json(dbQuizData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/upvote', withAuth, (req, res) => {
    Quiz.upvote({ ...req.body, user_id: req.session.user_id }, { Like, Quiz, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Quiz.update(
        {
            title: req.body.title,
            question: req.body.question,
            answer: req.body.answer
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbQuizData => {
            if (!dbQuizData) {
                res.status(404).json({ message: "No quiz found with this id" });
                return;
            }
            res.json(dbQuizData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No quiz found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;