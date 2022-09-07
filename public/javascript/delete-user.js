async function deleteUserHandler(event) {
  event.preventDefault();
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`/api/users/delete/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const logoutResponse = await fetch(`/api/users/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok && logoutResponse.ok) {
    window.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#delete-user")
  .addEventListener("click", deleteUserHandler);
