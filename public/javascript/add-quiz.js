async function quizMetaHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#quiz-title').value.trim();
    const description = document.querySelector('#quiz-description').value.trim();

    if (title && description) {
        try {
            const response = await fetch('/api/quizes', {
                method: 'post',
                body: JSON.stringify({ 
                    title, 
                    description,
                }),
                headers: { 'Content-Type': 'application/json'}
            });
            const returnedInfo = await response.json();

            if (response.ok) {
                document.querySelector('#quiz-title').value = returnedInfo.id;
                document.querySelector("#add-quiz-meta").setAttribute('style','display: none;')
                document.querySelector("#add-quiz-content").setAttribute('style','display:inline;')
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.log(error.response.body)
        }
    }
};

document.querySelector('#submit-quiz-meta').addEventListener('click', quizMetaHandler);