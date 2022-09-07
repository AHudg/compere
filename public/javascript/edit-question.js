async function editFormHandler(event) {
  event.preventDefault();

  const question = document.getElementsByClassName('question').innerText;
  const answer = document.getElementsByClassName('correct').innerText;
  const answer1 = document.getElementsByClassName('option1').innerText;
  const answer2 = document.getElementsByClassName('option2').innerText;
  const answer3 = document.getElementsByClassName('option3').innerText;
  const answer4 = document.getElementsByClassName('option4').innerText;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      question,
      answer,
      answer1,
      answer2,
      answer3,
      answer4,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

var editQuiz = document.getElementsByClassName('editable');
document.querySelector(".view-btn").addEventListener("click", editQuiz)
document
  .querySelector(".edit-question")
  .addEventListener("click", editFormHandler);
