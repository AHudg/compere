async function editFormHandler(event) {
    event.preventDefault();
    
    const userName = document.querySelector('input[name="profile-name"]').value;
    // const profileImage = document.querySelector('input[name="profile-img"]').value;
    const email = document.querySelector('input[name="profile-emails"]').value;

    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          userName,
        //   profileImage,
          email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // if (response.ok) {
    //   document.location.replace('/users/:id');
    // } else {
    //   alert(response.statusText);
    // }
    var editProfile = document.getElementsByClassName('editable');
    editProfile.addEventListener('input', function () {
        console.log('An edit has been detected')
    });
// add in a .then promise
  }
  

document.querySelector('.view-btn').addEventListener('click', editFormHandler);
  