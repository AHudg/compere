async function deleteUserHandler(event) {
    event.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const response = await fetch(`/dashboard/edit/${user_id}/`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      // window.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }

document.querySelector('#delete-user').addEventListener('click', deleteUserHandler);