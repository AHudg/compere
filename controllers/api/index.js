const router = require("express").Router();
const userRoutes = require("./user-routes");
const quizRoutes = require("./quiz-route"); // should probably be 'quiz-routes'
//const questionRoutes = require("./question-route");

router.use("/users", userRoutes);
router.use("/quizes", quizRoutes);
//router.use("/questions", questionRoutes);

module.exports = router;
