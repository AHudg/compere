async function editFormHandler(event) {
  event.preventDefault();

  const question = document.querySelector('input[name="question"]').value;
  const answer = document.querySelector('input[name="answer"]').value;
  const option1 = document.querySelector('input[name="option1"]').value;
  const option2 = document.querySelector('input[name="option2"]').value;
  const option3 = document.querySelector('input[name="option3"]').value;
  const option4 = document.querySelector('input[name="option4"]').value;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      question,
      answer,
      option1,
      option2,
      option3,
      option4,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/quiz/:id");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-question")
  .addEventListener("click", editFormHandler);
