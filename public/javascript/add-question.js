let preIndexArray = [];
let postIndexArray = [];

let contentIndex = 0;

const questionEl = document.querySelector("#question");
const ansOneEl = document.querySelector("#ans-one");
const ansTwoEl = document.querySelector("#ans-two");
const ansThreeEl = document.querySelector("#ans-three");
const ansFourel = document.querySelector("#ans-four");
const correctEl = document.querySelector("#correct");

const previousEl = document.querySelector('#previous');
const nextEl = document.querySelector('#next');
const saveEl = document.querySelector('#save-quiz');

async function quizContentHandler(event) {
    event.preventDefault();

    const question = document.querySelector("#question").value.trim();
    const ansOne = document.querySelector("#ans-one").value.trim();
    const ansTwo = document.querySelector("#ans-two").value.trim();
    const ansThree = document.querySelector("#ans-three").value.trim();
    const ansFour = document.querySelector("#ans-four").value.trim();
    let correct = document.querySelector("#correct").value.trim();

    const quizId = document.querySelector('#quiz-title').value;

    if (question && ansOne && ansTwo && ansThree && ansFour && correct) {
        if (correct === 'ansOne') {
            correct = ansOne;
        } else if (correct === 'ansTwo') {
            correct = ansTwo;
        } else if (correct === 'ansThree') {
            correct = ansThree;
        } else if (correct === 'ansFour') {
            correct = ansFour;
        }

        const response = await fetch(`/api/questions/quiz/${quizId}`, {
            method: 'post',
            body: JSON.stringify({ 
                question,
                ansOne,
                ansTwo,
                ansThree,
                ansFour,
                correct
             }),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
    
        } else {
            alert(response.statusText);
        };

        for (let i = 0; i < preIndexArray.length; i++) {
            const response = await fetch(`/api/questions/quiz/${quizId}`, {
                method: 'post',
                body: JSON.stringify(preIndexArray[i]),
                headers: { 'Content-Type': 'application/json'}
            });

            if (response.ok) {

            } else {
                alert(response.statusText);
            };
        };
        window.location.replace('/dashboard');
    };
};

async function gathersInformation(event) {
    const question = document.querySelector("#question").value.trim();
    const ansOne = document.querySelector("#ans-one").value.trim();
    const ansTwo = document.querySelector("#ans-two").value.trim();
    const ansThree = document.querySelector("#ans-three").value.trim();
    const ansFour = document.querySelector("#ans-four").value.trim();
    let correct = document.querySelector("#correct").value.trim();

        if (correct === 'ansOne') {
            correct = ansOne;
        } else if (correct === 'ansTwo') {
            correct = ansTwo;
        } else if (correct === 'ansThree') {
            correct = ansThree;
        } else if (correct === 'ansFour') {
            correct = ansFour;
        }

    if (event.target.id === 'previous') {
        contentIndex--;
        if (contentIndex === 0) {
            previousEl.setAttribute('style','display:none;');
        } else if (contentIndex === -1) {
            contentIndex++;
            return;
        }

        //TODO come back to make the previous button not functional when you do this

        // if values were put into the field
        if (question || ansOne || ansTwo || ansThree || ansFour || correct) {
            const specificQuestion = {
                question: question,
                ansOne: ansOne,
                ansTwo: ansTwo,
                ansThree: ansThree,
                ansFour: ansFour,
                correct: correct
            }
            postIndexArray.push(specificQuestion);
        }

        let previousInfo = preIndexArray.pop();

        questionEl.value = previousInfo.question;
        ansOneEl.value = previousInfo.ansOne;
        ansTwoEl.value = previousInfo.ansTwo;
        ansThreeEl.value = previousInfo.ansThree;
        ansFourel.value = previousInfo.ansFour;
        correctEl.value = previousInfo.correct;

    } else if (event.target.id === 'next') {
        // display none and inline for the submit button
        document.querySelector('#save-quiz').setAttribute('style','display: inline;')
        
        document.querySelector('#previous').setAttribute('style','display: inline;');

        if (question && ansOne && ansTwo && ansThree && ansFour && correct) {
            const specificQuestion = {
                question: question,
                ansOne: ansOne,
                ansTwo: ansTwo,
                ansThree: ansThree,
                ansFour: ansFour,
                correct: correct
            }

            preIndexArray.push(specificQuestion);
            contentIndex++;

            if (postIndexArray.length === 0) {
                questionEl.value = '';
                ansOneEl.value = '';
                ansTwoEl.value = '';
                ansThreeEl.value = '';
                ansFourel.value = '';
                // correctEl.value = '';
            } else {
                let previousInfo = postIndexArray.pop();

                questionEl.value = previousInfo.question;
                ansOneEl.value = previousInfo.ansOne;
                ansTwoEl.value = previousInfo.ansTwo;
                ansThreeEl.value = previousInfo.ansThree;
                ansFourel.value = previousInfo.ansFour;
                correctEl.value = previousInfo.correct;
            };
        }
    }
};


document.querySelector('#next').addEventListener('click', gathersInformation)
document.querySelector('#previous').addEventListener('click', gathersInformation)
document.querySelector('#save-quiz').addEventListener('click', quizContentHandler);