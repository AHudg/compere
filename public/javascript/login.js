const { ValidationError } = require("sequelize/types");

async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
          headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        window.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  window.location.replace('/dashboard');
}



document.querySelector('.google-button').addEventListener('click', onSignIn)

document.querySelector('.login').addEventListener('submit',loginFormHandler);
