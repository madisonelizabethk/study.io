const termSelectionBtn = document.getElementById('termSelection');
const termSelection = document.getElementById('term-select');
const termList = document.getElementById('termList');
const termIds = [];

function addTermBtn(event) {
  const term = termSelection.termId;
  console.log(`You chose the term: ${term}`);

  // Add to array
  termIds.push(term);

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

termSelectionBtn.addEventListener('click', addTermBtn);
