async function editFormHandler(event) {
  event.preventDefault();

  const username = document.getElementById("profileName").innerText;
  // const profileImage = document.querySelector('input[name="profile-img"]').value;
  const email = document.getElementById("profileEmail").innerText;
  const user_id = localStorage.getItem("user_id");
  const response = await fetch(`/api/users/${user_id}/`, {
    method: "PUT",
    body: JSON.stringify({
      username,
      //   profileImage,
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location.replace(`/dashboard/`);
}
var editProfile = document.getElementsByClassName("editable");

document.querySelector(".view-btn").addEventListener("click", editProfile);
document.querySelector(".view-btn").addEventListener("click", editFormHandler);
