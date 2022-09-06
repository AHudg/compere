// Keep the code that toggles the heart but switch the localstorage saving to use the database

async function likeQuiz(event) {
  const emblem = event.target;
  // checks that the click occured on the icon
  if (emblem.tagName.toLowerCase() === "i") {
    // if the icon is "unliked" status = like it and save to localStorage
    if (emblem.classList.contains("fa-regular")) {
      emblem.classList.remove("fa-regular");
      emblem.classList.add("fa-solid");
      const quizId = emblem.id;

      const response = await fetch("/api/quizes/like", {
        method: "PUT",
        body: JSON.stringify({
          quiz_id: emblem.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      emblem.previousElementSibling.innerText = `${
        parseInt(emblem.previousElementSibling.innerText) + 1
      } likes`;
    } else {
      emblem.classList.remove("fa-solid");
      emblem.classList.add("fa-regular");

      emblem.previousElementSibling.innerText = `${
        parseInt(emblem.previousElementSibling.innerText) - 1
      } likes`;

      const response = await fetch("/api/quizes/like", {
        method: "PUT",
        body: JSON.stringify({
          quiz_id: emblem.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // if the click event is not the icon, do nothing
  } else {
    return;
  }
}

async function checkLikes() {
  const response = await fetch("/api/users/likes");
  if (response.ok) {
    response.json().then((likes) => {
      const hearts = document.querySelectorAll(".fa-heart");
      for (const heart of hearts) {
        for (const likedQuiz of likes) {
          if (heart.id == likedQuiz.quiz_id) {
            heart.classList.remove("fa-regular");
            heart.classList.add("fa-solid");
          }
        }
      }
    });
  }
}

checkLikes();
document.querySelector(".quiz-section").addEventListener("click", likeQuiz);
