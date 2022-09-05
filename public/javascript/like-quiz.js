async function likeQuiz(event) {
  const emblem = event.target;
  console.log(emblem);
  // checks that the click occured on the icon
  if (emblem.tagName.toLowerCase() === "i") {
    // if the icon is "unliked" status = like it and save to localStorage
    if (emblem.classList.contains("fa-regular")) {
      emblem.classList.remove("fa-regular");
      emblem.classList.add("fa-solid");
      const quizId = emblem.id;
      const quizTitle = document.getElementById("quiz-title").innerText;

      var quizInfo = {
        quiz_id: quizId,
        title: quizTitle,
      };

      savedQuizzes = JSON.parse(localStorage.getItem("likedQuizzes"));

      if (!savedQuizzes) {
        savedQuizzes = [];
      }

      savedQuizzes.push(quizInfo);
      localStorage.setItem("likedQuizzes", JSON.stringify(savedQuizzes));

      // if the icon is "liked" status = then unlike it and remove it from localStorage
    } else {
      emblem.classList.remove("fa-solid");
      emblem.classList.add("fa-regular");
    }
    // if the click event is not the icon, do nothing
  } else {
    return;
  }
}

document.querySelector(".quiz-section").addEventListener("click", likeQuiz);
