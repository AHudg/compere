const quiz_id = window.location.toString().split("/")[
  window.location.toString().split("/").length - 2
];

const putData = [];

async function editFormHandler(event) {
<<<<<<< HEAD
    event.preventDefault();
    
    const editData = [];

    const divLength = document.querySelector('#edit-location').children;

    for (let i = 0; i < divLength.length; i++) {
      const divEl = document.getElementById(i).children;

      const extractedData = [];
      
      for (let j = 0; j < divEl.length; j++) {
        if (j % 2 != 0) {
          extractedData.push(divEl[j])
        }
      }   

      editData.push(extractedData);
    }

    for (let i = 0; i < editData.length; i++) {
      console.log(editData[i][0].innerText);
      
    }

    

    // const response = await fetch(`/api/quiz/${id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     title,
    //     description,
    //     question,
    //     answer
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // window.location.replace(`/quiz/${quiz_id}/`);
=======
  event.preventDefault();

  // const title = document.getElementById('title').innerText;
  // const description = document.getElementById('description').innerText;
  // const question = document.getElementsByClassName('question').innerText;
  // const answer = document.getElementsByClassName('answer').innerText;
  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length - 1
  // ];
  // const response = await fetch(`/api/quiz/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify({
  //     title,
  //     description,
  //     question,
  //     answer
  //   }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  window.location.replace(`/quiz/${quiz_id}/`);
>>>>>>> 5470a3c50096fe2ce92f62e296a5036cb4310048
}

async function populateQuiz() {
  try {
    const response = await fetch(`/api/questions/quiz/${quiz_id}`);
    const quizData = await response.json();

    if (!quizData) {
      console.log("Error. No questions found with this quiz id.");
      return;
    }

<<<<<<< HEAD
    const referenceDiv = document.querySelector('#edit-location');
=======
    console.log(quizData);

    const referenceDiv = document.querySelector("#edit-location");
>>>>>>> 5470a3c50096fe2ce92f62e296a5036cb4310048

    for (let i = 0; i < quizData.length; i++) {
      // create a div for styling spacing and id reference
      const divEl = document.createElement("div");
      divEl.setAttribute("id", i);
      divEl.classList.add("edit-section");
      divEl.classList.add("col-10");
      referenceDiv.appendChild(divEl);

      // create and append the question label
      const questionLabelEl = document.createElement("label");
      questionLabelEl.setAttribute("for", "question");
      questionLabelEl.classList.add("col-12");
      questionLabelEl.innerText = "Question:";
      divEl.appendChild(questionLabelEl);

      // create and append the question from database
      const questionEditEl = document.createElement("p");
      questionEditEl.classList.add("col-12");
      questionEditEl.classList.add("editable");
      questionEditEl.innerText = quizData[i].question;
      divEl.appendChild(questionEditEl);

      // create and append the first answer choice label
      const oneLabelEl = document.createElement("label");
      oneLabelEl.setAttribute("for", "ans-one");
      oneLabelEl.classList.add("col-12");
      oneLabelEl.innerText = "Answer One:";
      divEl.appendChild(oneLabelEl);

      // create and append the first answer from database
      const oneEditEl = document.createElement("p");
      oneEditEl.classList.add("col-12");
      oneEditEl.innerText = quizData[i].answer1;
      divEl.appendChild(oneEditEl);

      // create and append the second answer choice label
      const twoLabelEl = document.createElement("label");
      twoLabelEl.setAttribute("for", "ans-one");
      twoLabelEl.classList.add("col-12");
      twoLabelEl.innerText = "Answer Two:";
      divEl.appendChild(twoLabelEl);

      // create and append the second answer from database
      const twoEditEl = document.createElement("p");
      twoEditEl.classList.add("col-12");
      twoEditEl.innerText = quizData[i].answer2;
      divEl.appendChild(twoEditEl);

      // create and append the third answer choice label
      const threeLabelEl = document.createElement("label");
      threeLabelEl.setAttribute("for", "ans-one");
      threeLabelEl.classList.add("col-12");
      threeLabelEl.innerText = "Answer Three:";
      divEl.appendChild(threeLabelEl);

      // create and append the third answer from database
      const threeEditEl = document.createElement("p");
      threeEditEl.classList.add("col-12");
      threeEditEl.innerText = quizData[i].answer3;
      divEl.appendChild(threeEditEl);

      // create and append the fourth answer choice label
      const fourLabelEl = document.createElement("label");
      fourLabelEl.setAttribute("for", "ans-one");
      fourLabelEl.classList.add("col-12");
      fourLabelEl.innerText = "Answer Four:";
      divEl.appendChild(fourLabelEl);

      // create and append the fourth answer from database
      const fourEditEl = document.createElement("p");
      fourEditEl.classList.add("col-12");
      fourEditEl.innerText = quizData[i].answer4;
      divEl.appendChild(fourEditEl);

      // create and append the correct choice label
      const correctLabelEl = document.createElement("label");
      correctLabelEl.setAttribute("for", "ans-one");
      correctLabelEl.classList.add("col-12");
      correctLabelEl.innerText = "Correct Answer:";
      divEl.appendChild(correctLabelEl);

      // create and append the correct choice from database
      const correctEditEl = document.createElement("p");
      correctEditEl.classList.add("col-12");

      if (quizData[i].correct === quizData[i].answer1) {
        correctEditEl.innerText = "Answer One";
      } else if (quizData[i].correct === quizData[i].answer2) {
        correctEditEl.innerText = "Answer Two";
      } else if (quizData[i].correct == quizData[i].answer3) {
        correctEditEl.innerText = "Answer Three";
      } else if (quizData[i].correct === quizData[i].answer4) {
        correctEditEl.innerText = "Answer Four";
      }

      divEl.appendChild(correctEditEl);
    }
  } catch (error) {
    // console.log(error.response.body)
  }
}

var editQuiz = document.getElementsByClassName("editable");

document.querySelector(".view-btn").addEventListener("click", editQuiz);
document.querySelector(".view-btn").addEventListener("click", editFormHandler);

populateQuiz();
