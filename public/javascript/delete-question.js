async function deleteFormHandler(event) {
  event.preventDefault();
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/questions/${id}`, {
    method: 'DELETE'
  });
}
  
document.querySelector('.delete-question-btn').addEventListener('click', deleteFormHandler);
  