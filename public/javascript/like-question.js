async function likeQuiz(event) {
  const emblem = event.target;
  if (emblem.tagName.toLowerCase() === "i") {
    if (emblem.classList.contains("fa-regular")) {
      emblem.classList.remove("fa-regular");
      emblem.classList.add("fa-solid");
      // emblem.value = "liked";
      const quizId = document.getElementById("1");
      const quizTitle = document.getElementById("quiz-title");
    } else {
      emblem.classList.remove("fa-solid");
      emblem.classList.add("fa-regular");
    }
  } else {
    return;
  }
}

document.querySelector(".quiz-body").addEventListener("click", likeQuiz);
