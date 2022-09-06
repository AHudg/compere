async function quizMetaHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#quiz-title').value.trim();
    const description = document.querySelector('#quiz-description').value.trim();

    if (title && description) {
        const response = await fetch('/api/quizes', {
            method: 'post',
            body: JSON.stringify({ 
                title, 
                description,
             }),
            headers: { 'Content-Type': 'application/json'}
        });

        if (response.ok) {
            renderQuizInputs();
        } else {
            alert(response.statusText);
        }
    }
};

async function renderQuizInputs() {
    document.querySelector("#add-quiz-meta").setAttribute('style','display: none;')
    document.querySelector("#add-quiz-content").setAttribute('style','display:inline;')
}

document.querySelector('#submit-quiz-meta').addEventListener('click', quizMetaHandler);
