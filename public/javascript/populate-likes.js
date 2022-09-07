// Delete this. It is localstorage for the liked quizzes

async function populateLikedQuizzes() {
  // get localStorage data
  savedQuizzes = JSON.parse(localStorage.getItem("likedQuizzes"));
  console.log(savedQuizzes);
  // if data exists, populate the liked qizzes
  if (savedQuizzes && savedQuizzes.length != 0) {
    for (let i = 0; i < savedQuizzes.length; i++) {
      // create the list element, style and append
      const liEl = document.createElement("li");
      liEl.setAttribute("class", "liked-section");

      if (i % 2 === 0) {
        liEl.setAttribute("style", "background-color: rgba(110,139,61,0.5);");
      }

      document.getElementsByClassName("sidebar")[0].appendChild(liEl);

      // create the header to hold the quiz title, style and append
      const quiztitle = document.createElement("a");
      quiztitle.setAttribute("href", "/quiz/" + savedQuizzes[i].quiz_id);
      quiztitle.setAttribute("class", "liked-title");
      quiztitle.setAttribute("id", savedQuizzes[i].quiz_id);
      quiztitle.innerText = savedQuizzes[i].title;
      liEl.appendChild(quiztitle);
    }
    // if no data exists, hide the sidebar from user view
  } else {
    document
      .getElementsByClassName("sidebar")[0]
      .setAttribute("style", "display:none;");
  }
}

async function getLikedQuizzes() {
  const response = await fetch("/api/users/likes");
  if (response.ok) {
    response.json().then((likedQuizzes) => {
      for (let i = 0; i < likedQuizzes.length; i++) {
        // create the list element, style and append
        const liEl = document.createElement("li");
        liEl.setAttribute("class", "liked-section");

        if (i % 2 === 0) {
          liEl.setAttribute("style", "background-color: rgba(110,139,61,0.5);");
        }

        document.getElementsByClassName("sidebar")[0].appendChild(liEl);

        // create the header to hold the quiz title, style and append
        const quiztitle = document.createElement("a");
        quiztitle.setAttribute("href", "/quiz/" + likedQuizzes[i].quiz_id);
        quiztitle.setAttribute("class", "liked-title");
        quiztitle.setAttribute("id", likedQuizzes[i].quiz_id);
        quiztitle.innerText = likedQuizzes[i].quiz.title;
        liEl.appendChild(quiztitle);
      }
    });
  }
}

getLikedQuizzes();
