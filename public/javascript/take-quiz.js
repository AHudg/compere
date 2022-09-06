const questionEl = document.querySelector("#question");
const imageEl = document.querySelector("#question-img");
const opiton1El = document.querySelector("#answer1");
const opiton2El = document.querySelector("#answer2");
const opiton3El = document.querySelector("#answer3");
const opiton4El = document.querySelector("#answer4");
const confirmAnswerEl = document.querySelector("#confirm");
let score = 0;
var questionArr = [];
let quizLen = 0;
var currentProblem;

async function takeQuiz() {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 2
  ];
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
  opiton1El.textContent = currentProblem.answer1;
  opiton2El.textContent = currentProblem.answer2;
  opiton3El.textContent = currentProblem.answer3;
  opiton4El.textContent = currentProblem.answer4;
}

function checkAnswerHandler(event) {
  var targetEl = event.target;
  var background = document.querySelector(`#answer${targetEl.id}`);
  var defaultBg = background.style.background;
  if (targetEl.value === currentProblem.correct) {
    score++;
    background.style.background = "#095";
  } else if (targetEl.matches(".btn")) {
    background.style.background = "#d00";
  }

  if (questionArr.length > 0) {
    setTimeout(function () {
      background.style.background = defaultBg;
      loadQuestion();
    }, 100);
  } else {
    setTimeout(function () {
      background.style.background = defaultBg;
      calcualteScore();
    }, 100);
  }
}

async function calcualteScore() {
  points = Math.floor(score / quizLen);

  const response = await fetch(`/api/quizes/${id}scores`, {
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
confirmAnswerEl.addEventListener("click", checkAnswerHandler);
