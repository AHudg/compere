async function editFormHandler(event) {
    event.preventDefault();
    
    const title = document.querySelector('input[name="title"]').value;
    const description = document.querySelector('input[name="description"]').value;
    const picture = document.querySelector('input[name="picture"]').value;
    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/quiz/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        description,
        picture
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/', '/quiz/:id');
    } else {
      alert(response.statusText);
    }
}


document.querySelector('.edit-quiz-form').addEventListener('click', editFormHandler);
  