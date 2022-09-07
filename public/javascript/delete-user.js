async function deleteUserHandler(event) {
    event.preventDefault();
  
    const response = await fetch(`/api/users`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }

document.querySelector('#delete-user').addEventListener('click', deleteUserHandler);