async function editFormHandler(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').innerText;
    const description = document.getElementById('description').innerText;
    const question = document.getElementsByClassName('question').innerText;
    const answer = document.getElementsByClassName('answer').innerText;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/quiz/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        question,
        answer
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

}
var editQuiz = document.getElementsByClassName('editable');  

document.querySelector('.view-btn').addEventListener('click', editQuiz);
document.querySelector('.edit-quiz-form').addEventListener('click', editFormHandler);
  