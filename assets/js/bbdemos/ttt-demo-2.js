let occupied = 0;
let xBoard = 0;

let playerOne = 'X';
let playerTwo = 'O';
let currentPlayer = playerOne;

const gameBoard = document.getElementById('game-board-demo-2');
const occupiedBitboard = document.getElementById('occupied-bitboard-demo-2');
const xBitboard = document.getElementById('x-bitboard-demo-2');
const oBitboard = document.getElementById('o-bitboard-demo-2');
const statusText = document.getElementById('status-demo-2');

const boxes = FillElementWithChild(gameBoard, 'div', 'box', 9, '');
const occupiedBits = FillElementWithChild(occupiedBitboard, 'div', 'bit', 9);
const xBits = FillElementWithChild(xBitboard, 'div', 'bit', 9, '1');
const oBits = FillElementWithChild(oBitboard, 'div', 'bit', 9);

boxes.forEach((box, index) =>
  box.addEventListener('click', (e) => {
    const moveBit = 1 << index;

    if ((occupied & moveBit) !== 0) {
      return;
    }
    occupied |= moveBit;
    if (currentPlayer === playerOne) {
      xBoard |= moveBit;
    }

    SetText(e.currentTarget, currentPlayer);

    SwapPlayer();

    UpdateBitboards();
  }),
);

document.getElementById('reset-btn-demo-2').addEventListener('click', () => {
  boxes.forEach((box) => SetText(box, ''));

  occupied = 0;
  xBoard = 0;
  currentPlayer = playerOne;
  UpdateBitboards();
  SetText(statusText, `Player ${playerOne}'s turn`);
});
function UpdateBitboards() {
  SetBitboardText(occupied, occupiedBits);
  SetBitboardText(~xBoard, xBits);
  SetBitboardText(~xBoard & occupied, oBits);
}
function GetCurrentBoard() {
  return currentPlayer === playerOne ? xBoard : ~xBoard & occupied;
}

function SwapPlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  SetText(statusText, `Player ${currentPlayer}'s turn`);
}
