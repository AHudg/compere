// quizMeta = [quiz title,
//            question length,
//            how its scored (boolean for timed/points),
//            timer,
//            add value,
//            subtract value]
const quizMeta = [];

// used to compare against question length from quizMeta to track status of quiz progression
let quizLocation = 0;

const questionEl = document.querySelector('.active-question');
const timerEl = document.querySelector('.active-time');


async function gatherQuizData() {
    const response = await fetch(`/api/quizes/1`)
    .then(dbQuestionResponse => {
        if (dbQuestionResponse.ok) {
            dbQuestionResponse.json()
                .then(dbQuestionData => {
                    quizMeta.push(dbQuestionData.title);
                    quizMeta.push(dbQuestionData.questions.length);
                    quizMeta.push(dbQuestionData.pt_score);
                    quizMeta.push(dbQuestionData.timer);
                    quizMeta.push(dbQuestionData.add);
                    quizMeta.push(dbQuestionData.deduct);
                    startTimer();
            })
        }
    })
}

const startTimer = function() {
    let startTimer = 5; //seconds
// uses setInterval to initialize a countdown to start the quiz
    const countdownInterval = setInterval(function() {
        if (startTimer > 0) {
            questionEl.textContent = 'Quiz starting in ' + startTimer;
            // decrement the time by 1s
            startTimer--;
        } else {
            // clear timer because the quiz has begun
            clearInterval(countdownInterval);
            questionEl.textContent = 'Complete!';
            startQuiz();
        };
    }, 1000);
};

const startQuiz = function() {
    // uses setInterval to call the actual quiz timer for active use/points
    const quizInterval = setInterval(function() {
        let quizTimer = quizMeta[3];
        // as long as time is left and you haven't answered all questions..
        if (quizTimer > 0 && quizLocation < quizMeta[2]) {
            timerEl.textContent = 'Time Left: ' + quizTimer;
            //decrement the time by 1s
            quizTimer--;
            questionEl.textContent = quizTimer;
        // user completes quiz
        } else if (quizTimer > 0 && quizLocation >= quizMeta[2]) {
            questionEl.textContent = 'Else If';
            clearInterval(quizInterval);
            console.log('Congratulations!');
        // user ran out of time
        } else {
            questionEl.textContent = 'Else';
            clearInterval(quizInterval);
            console.log('You lost!');
        };
    }, 1000);
};

gatherQuizData();