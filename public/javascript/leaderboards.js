async function populateUserScores() {
    const quiz_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 2
      ];

    try {
        const response = await fetch(`/api/users/${quiz_id}/scores`);
        const userScores = await response.json()

        if (!userScores) {
            console.log('Error. No user scores found with this quiz id.');
            return;
        }

        for (let i = 0; i < userScores.length; i++) {
            const liEl = document.createElement("li");
            liEl.classList.add('col-8');
            liEl.classList.add('row');
            liEl.classList.add('individual');        
            liEl.classList.add('align-items-center');

            document.querySelector('#user-scores').appendChild(liEl);

            const scoreEl = document.createElement("p");
            scoreEl.innerText = userScores[i].points;
            scoreEl.classList.add('col-6');
            scoreEl.classList.add('score-row');
            liEl.appendChild(scoreEl);

            const dateEl = document.createElement("p");
            const dateArray = userScores[i].created_at.toString().split('-');
            const displayDate = dateArray[1] + "-" + dateArray[0];
            dateEl.innerText = displayDate;
            dateEl.classList.add('col-6');
            dateEl.classList.add('score-row');
            liEl.appendChild(dateEl);
            
        }

    } catch (error) {
        console.log(error.response.body);
    }
};

populateUserScores();