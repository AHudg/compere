const loginFormHandler = async function (event) {
    event.preventDefault();
  window.alert('hi');
    const email = document.querySelector('#login-email')
    const password = document.querySelector('#login-password')
    console.log(email, password)
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value.trim()
        }),
          headers: { 'Content-Type': 'application/json' }
      })
  
      .then (function() {
        document.location.replace('/');
      })
      .catch(err => console.log(err))
     // else {
     //   alert(response.statusText);
     // }
    }
}

// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

//   window.location.replace('/dashboard');
// }



// document.querySelector('.google-button').addEventListener('click', onSignIn)

document.querySelector('.view-btn').addEventListener('click',loginFormHandler);
console.log('something');