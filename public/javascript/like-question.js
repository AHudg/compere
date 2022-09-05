async function likeQuiz(event) {
  const emblem = event.target;
  console.log(emblem);
  if (emblem.tagName.toLowerCase() === "i") {
    if (emblem.classList.contains("fa-regular")) {
      emblem.classList.remove("fa-regular");
      emblem.classList.add("fa-solid");
    } else {
      emblem.classList.remove("fa-solid");
      emblem.classList.add("fa-regular");
    }
  } else {
    return;
  }
}

document.querySelector(".quiz-body").addEventListener("click", likeQuiz);
