async function editFormHandler(event) {
  event.preventDefault();

  const question = document.querySelector('input[name="question"]').value;
  const answer = document.querySelector('input[name="answer"]').value;
  const answer1 = document.querySelector('input[name="option1"]').value;
  const answer2 = document.querySelector('input[name="option2"]').value;
  const answer3 = document.querySelector('input[name="option3"]').value;
  const answer4 = document.querySelector('input[name="option4"]').value;

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

  // var editProfile = document.getElementsByClassName('editable');
  //  function () {
  //     console.log('An edit has been detected')
  // });
}
document.querySelector
document
  .querySelector(".edit-question")
  .addEventListener("click", editFormHandler);
