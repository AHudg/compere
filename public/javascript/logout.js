async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
  }
  // signOut();
}

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }
// for the google log in/log out

document.querySelector('.logout').addEventListener('click', logout);
  
// document.querySelector('.logout').addEventListener('submit', editFormHandler);
