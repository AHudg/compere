// returns an array of 4 randomly selected quiz ID's to be displayed on the homepage.
// only selects their ID's the data itself must still be grabbed.
function getFourQuizzes(quizCount) {
  // creates an array with values from 1 to the value of quizCount
  quizIDs = [...Array(quizCount).keys()].map((i) => i + 1);
  if (quizIDs.length <= 4) {
    return quizIDs;
  }
  // use the Fisher Yates method to randomize the order of the array. because javascript can't be bothered to include a function like by default GOD FORBID TH-
  // commented cuz if im gunna lift code i want to at least understand it.

  for (let i = quizIDs.length - 1; i > 0; i--) {
    // ^  start at the end of the array and work forwards

    let j = Math.floor(Math.random() * i); // get a random number from 0 to current position.
    let k = quizIDs[i]; // save the value we have
    quizIDs[i] = quizIDs[j];
    quizIDs[j] = k; // swap the values at positions [i] and [j]
  }
  // grab the first 4 values after shuffle
  return quizIDs.slice(0, 4);
}

module.exports = getFourQuizzes;