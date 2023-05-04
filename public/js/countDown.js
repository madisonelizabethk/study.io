let count = 100;
const countText = document.getElementById('counter');
countText.textContent = count; // Set the countText to the initial value

function decrementCounter() {
  count -= 1;
  countText.textContent = count;
}

setInterval(decrementCounter, 1000);
