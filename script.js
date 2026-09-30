const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

function handleCellClick(event) {
const cell = event.target;
const index = Number(cell.dataset.index);

if (board[index] !== "" || !gameActive) {
    return;
}

board[index] = currentPlayer;
cell.textContent = currentPlayer;
cell.disabled = true;

if (currentPlayer === "O") {
    cell.classList.add("o");
}

checkGameResult();


}

function checkGameResult() {
let winningLine = null;

for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
        board[a] !== "" &&
        board[a] === board[b] &&
        board[a] === board[c]
    ) {
        winningLine = combination;
        break;
    }
}

if (winningLine) {
    gameActive = false;

    winningLine.forEach(index => {
        cells[index].classList.add("winner");
    });

    statusText.textContent = `Player ${currentPlayer} wins!`;
    return;
}

if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
    return;
}

currentPlayer = currentPlayer === "X" ? "O" : "X";
statusText.textContent = `Player ${currentPlayer}'s turn`;


}

function restartGame() {
board = ["", "", "", "", "", "", "", "",];
currentPlayer = "X";
gameActive = true;

cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("o", "winner");
});

statusText.textContent = "Player X's turn";


}

cells.forEach(cell => {
cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
