async function retrieveQuestion() {
    const response = await fetch(`/api/questions/quiz/1`)
    .then(dbQuestionResponse => {
        if (dbQuestionResponse.ok) {
            dbQuestionResponse.json()
                .then(dbQuestionData => {
                    console.log(dbQuestionData.length)
            })
        }
    })
}

retrieveQuestion();