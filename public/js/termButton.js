const termSelectionBtn = document.getElementById('termSelection');
const termSelection = document.getElementById('term-select');
const termlist = document.getElementById('termlist');

const termIds = [];
function addTermBtn(event) {
  const term = termSelection.termId;
  console.log(`You chose the term ${term}`);

  // Add it to an array of terms
  termIds.push(term);

  // Display choices to user
  console.log(termIds);
}

termSelectionBtn.addEventListener('click', addTermBtn);
