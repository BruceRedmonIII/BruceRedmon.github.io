let occupied = 0;
let xBoard = 0;

let playerOne = 'X';
let playerTwo = 'O';
let currentPlayer = playerOne;
let gameOver = false;

const gameBoard = document.getElementById('game-board-demo-4');
const xBitboard = document.getElementById('x-bitboard-demo-4');
const oBitboard = document.getElementById('o-bitboard-demo-4');
const statusText = document.getElementById('status-demo-4');

const boxes = FillElementWithChild(gameBoard, 'div', 'box', 9, '');
const xBits = FillElementWithChild(xBitboard, 'div', 'bit', 9);
const oBits = FillElementWithChild(oBitboard, 'div', 'bit', 9);

const winConditions = [
  0b000000111, // Row 1
  0b000111000, // Row 2
  0b111000000, // Row 3
  0b001001001, // Column 1
  0b010010010, // Column 2
  0b100100100, // Column 3
  0b100010001, // Diagonal \
  0b001010100, // Diagonal /
];

boxes.forEach((box, index) =>
  box.addEventListener('click', (e) => {
    if (gameOver) {
      return;
    }

    const moveBit = 1 << index;

    if ((occupied & moveBit) !== 0) {
      return;
    }
    occupied |= moveBit;
    if (currentPlayer === playerOne) {
      xBoard |= moveBit;
    }

    SetText(e.currentTarget, currentPlayer);

    if (!IsGameOver()) {
      SwapPlayer();
    }

    UpdateBitboards();
  }),
);

document.getElementById('reset-btn-demo-4').addEventListener('click', () => {
  boxes.forEach((box) => SetText(box, ''));

  occupied = 0;
  xBoard = 0;
  gameOver = false;
  currentPlayer = playerOne;
  UpdateBitboards();
  SetText(statusText, `Player ${playerOne}'s turn`);
});
function UpdateBitboards() {
  SetBitboardText(xBoard, xBits);
  SetBitboardText(~xBoard & occupied, oBits);
}
function GetCurrentBoard() {
  return currentPlayer === playerOne ? xBoard : ~xBoard & occupied;
}

function SwapPlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  SetText(statusText, `Player ${currentPlayer}'s turn`);
}

function IsGameOver() {
  if (CheckBitboardWin(GetCurrentBoard(), winConditions)) {
    gameOver = true;
    SetText(statusText, `Player ${currentPlayer} Wins!`);
    return true;
  } else if (occupied === 0b111111111) {
    gameOver = true;
    SetText(statusText, "It's a Tie!");
    return true;
  }
  return false;
}
