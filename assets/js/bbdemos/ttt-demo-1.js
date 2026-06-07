let occupied = 0;
let xBoard = 0;

let playerOne = 'X';
let playerTwo = 'O';
let currentPlayer = playerOne;

const gameBoard = document.getElementById('game-board-demo-1');
const occupiedBitboard = document.getElementById('occupied-bitboard-demo-1');
const statusText = document.getElementById('status-demo-1');

const boxes = FillElementWithChild(gameBoard, 'div', 'box', 9, '');
const occupiedBits = FillElementWithChild(occupiedBitboard, 'div', 'bit', 9);

boxes.forEach((box, index) => box.addEventListener('click', (e) => 
  {

    const moveBit = 1 << index;

    if ((occupied & moveBit) !== 0)
    {
      return;
    }
    occupied |= moveBit;
    if (currentPlayer === playerOne)
    {
      xBoard |= moveBit;
    }

    SetText(e.currentTarget, currentPlayer);

    SwapPlayer();
    
    UpdateOccupiedBitboard();
  }));

document.getElementById('reset-btn-demo-1').addEventListener('click', () =>
{
    boxes.forEach(box => SetText(box, ''));
    occupiedBits.forEach(bit => SetText(bit, '0'));
    occupied = 0;
    xBoard = 0;
    currentPlayer = playerOne;
    SetText(statusText, `Player ${playerOne}'s turn`);
});
function UpdateOccupiedBitboard()
{
  SetBitboardText(occupied, occupiedBits);
}
function GetCurrentBoard()
{
  return currentPlayer === playerOne
    ? xBoard
    : (~xBoard & occupied);
}

function SwapPlayer()
{
  currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
  SetText(statusText, `Player ${currentPlayer}'s turn`);
}