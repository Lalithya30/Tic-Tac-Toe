const board = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function drawBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.textContent = cell;
    div.addEventListener('click', () => handleMove(index));
    board.appendChild(div);
  });
}

function handleMove(index) {
  if (!gameActive || cells[index] !== '') return;
  cells[index] = currentPlayer;
  drawBoard();
  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => 
    pattern.every(index => cells[index] === currentPlayer)
  );
}

function restartGame() {
  currentPlayer = 'X';
  cells = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  drawBoard();
}

drawBoard();
statusText.textContent = `Player ${currentPlayer}'s turn`;
