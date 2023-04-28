const termSelectionBtn = document.getElementById('termSelectionBtn');
const termSelection = document.getElementById('term-select');
const quizSubmitBtn = document.getElementById('quizSubmitBtn');
const setNameInput = document.getElementById('setName');
const termList = document.getElementById('termList');
const termIds = [];

function addTermBtn(event) {
  const termId = termSelection.value;
  console.log(`You chose the term: ${termId}`);
  if (termIds.includes(termId)){
    return;
  }
  // Add to array
  termIds.push(termId);

  // Display choices to user
  // Create new item element
  const newQuestion = document.createElement('li');

  // Get text for selected question
  const selectedOption = termSelection.options[termSelection.selectedIndex];
  const termName = selectedOption.textContent;

  // Set text content
  newQuestion.textContent = termName;

  // Add selected term to page
  termList.appendChild(newQuestion);
}

async function submitQuizBtn(event) {
  console.log("Submit New Quiz");
  const setName = setNameInput.value;
  console.log(`Creating the quiz called: ${setName}`);
  console.log(termIds)

  const payload = {setName, termIDs: termIds};
  // Call endpoint for adding quiz
  const response = await fetch('/api/quizzes', {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }

  });

  if (response.redirected) {
    window.location.href = response.url;
  }
}

termSelectionBtn.addEventListener('click', addTermBtn);
quizSubmitBtn.addEventListener('click', submitQuizBtn);
