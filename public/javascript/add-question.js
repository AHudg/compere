async function newFormHandler(event) {
    event.preventDefault();

    const question = document.querySelector('input[name="question"]').value;
    const answer = document.querySelector('input[name="answer"]').value;

    const response = await fetch(`/api/questions`, {
        method: 'POST',
        body: JSON.stringify({
            question,
            answer
        }),
        headers: {
            'Content-Tye': 'application/json'
        }
    });
}
document.querySelector('.add-button').addEventListener('submit', editFormHandler);
