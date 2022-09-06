async function editFormHandler(event) {
    event.preventDefault();
    
    const question = document.querySelector('input[name="question"]').value;
    const answer = document.querySelector('input[name="answer"]').value;
    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/questions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          question,
          answer
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
  
  document.querySelector('.edit-question').addEventListener('click', editFormHandler);
  