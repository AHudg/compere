const questionEl = document.querySelector("#question");
const imageEl = document.querySelector("#question-img");
const opiton1El = document.querySelector("#answer1");
const opiton2El = document.querySelector("#answer2");
const opiton3El = document.querySelector("#answer3");
const opiton4El = document.querySelector("#answer4");
const answerChoicesEl = document.querySelector("#answers");
let score = 0;
var questionArr = [];
let quizLen = 0;
var currentProblem;
const id = parseInt(
  window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ]
);

async function takeQuiz() {
  const response = await fetch(`/api/questions/quiz/${id}`);
  if (response.ok) {
    response.json().then((questions) => {
      questionArr = questions;
      quizLen = questions.length;
      loadQuestion();
    });
  }
}

function loadQuestion() {
  var n = Math.floor(Math.random() * questionArr.length);
  currentProblem = questionArr[n];
  questionArr.splice(n, 1);

  questionEl.textContent = currentProblem.question;
  if (currentProblem.img_url) {
    imageEl.setAttribute("src", currentProblem.img_url);
  } else {
    imageEl.setAttribute("src", "");
  }
  opiton1El.textContent = currentProblem.answer1;
  opiton2El.textContent = currentProblem.answer2;
  opiton3El.textContent = currentProblem.answer3;
  opiton4El.textContent = currentProblem.answer4;
}

function checkAnswerHandler(event) {
  console.log(event.target);
  var targetEl = event.target;
  console.log(currentProblem);
  if (targetEl.innerText === currentProblem.correct) {
    score++;
  } else if (targetEl.matches(".btn")) {
  }

  if (questionArr.length > 0) {
    setTimeout(function () {
      loadQuestion();
    }, 100);
    return;
  } else {
    setTimeout(function () {
      calcualteScore();
      window.location.replace(`/quiz/${id}/leaderboard`);
    }, 100);

    return;
  }
}

async function calcualteScore() {
  points = Math.floor((score / quizLen) * 100);

  const response = await fetch(`/api/quizes/${id}/scores`, {
    method: "post",
    body: JSON.stringify({
      points,
    }),
    headers: { "Content-Type": "application/json" },
  });

  /*
    display final score somewhere
    */
}
takeQuiz();
answerChoicesEl.addEventListener("click", checkAnswerHandler);
