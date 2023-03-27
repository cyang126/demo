const cellElements = document.querySelectorAll("[data-cell]");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let gameFinished = false;

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  if (gameFinished || cell.dataset.value) {
    return;
  }
  cell.dataset.value = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    gameFinished = true;
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
    }, 100);
    return;
  }
  if (checkDraw()) {
    gameFinished = true;
    setTimeout(() => {
      alert("Draw!");
    }, 100);
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (currentPlayer === "O") {
    computerPlay();
  }
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].dataset.value === currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cellElements].every((cell) => {
    return cell.dataset.value;
  });
}

function computerPlay() {
  let availableCells = [];
  cellElements.forEach((cell) => {
    if (!cell.dataset.value) {
      availableCells.push(cell);
    }
  });
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const randomCell = availableCells[randomIndex];
  randomCell.dataset.value = currentPlayer;
  randomCell.textContent = currentPlayer;
  if (checkWin()) {
    gameFinished = true;
    alert(`${currentPlayer} wins!`);
    return;
  }
  if (checkDraw()) {
    gameFinished = true;
    alert("Draw!");
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}
