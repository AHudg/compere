const questionEl = document.querySelector("#question");
const imageEl = document.querySelector("#question-img");
const opiton1El = document.querySelector("#question1");
const opiton2El = document.querySelector("#question2");
const opiton3El = document.querySelector("#question3");
const opiton4El = document.querySelector("#question4");
const confirmAnswerEl = document.querySelector("#confirm");
let score = 0;
var questionArr = [];
let quizLen = 0;

async function takeQuiz() {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
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
  /*
        check if an answer is selected

        check if answer selected was the right one
        
        if yes: score ++ (make selected answer green?)

        else: (make selected answer red?)

        loadQuestion()
    */
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

confirmAnswerEl.addEventListener("click", checkAnswerHandler);

