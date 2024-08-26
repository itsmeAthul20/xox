const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = clickedCell.dataset.index;

    if (gameState[clickedCellIndex] || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (!gameState.includes('')) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameState.fill('');
    gameActive = true;
    statusText.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

statusText.textContent = `It's ${currentPlayer}'s turn`;
