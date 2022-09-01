const router = require('express').Router();

const userRoutes = require('./user-routes');
const quizRoutes = require('./quiz-route');
const questionRoutes = require('./question-route');


router.user('/user', userRoutes);
router.use('/quiz', quizRoutes);
router.use('/question', questionRoutes);

module.exports = router;