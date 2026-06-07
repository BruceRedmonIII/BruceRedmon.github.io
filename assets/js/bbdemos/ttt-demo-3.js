const topRowMask = 0b000000111;
const middleRowMask = 0b000111000;
const bottomRowMask = 0b111000000;
const leftColMask = 0b001001001;
const middleColMask = 0b010010010;
const rightColMask = 0b100100100;
const diagonalMask = 0b100010001;
const antiDiagonalMask = 0b001010100;

const topRowElement = document.getElementById('top-row-mask');
const middleRowElement = document.getElementById('middle-row-mask');
const bottomRowElement = document.getElementById('bottom-row-mask');
const leftColElement = document.getElementById('left-col-mask');
const middleColElement = document.getElementById('middle-col-mask');
const rightColElement = document.getElementById('right-col-mask');
const diagonalElement = document.getElementById('diagonal-mask');
const antiDiagonalElement = document.getElementById('anti-diagonal-mask');

const topRowBits = FillElementWithChild(topRowElement, 'div', 'bit', 9, '0');
const middleRowBits = FillElementWithChild(middleRowElement, 'div', 'bit', 9, '0');
const bottomRowBits = FillElementWithChild(bottomRowElement, 'div', 'bit', 9, '0');
const leftColBits = FillElementWithChild(leftColElement, 'div', 'bit', 9, '0');
const middleColBits = FillElementWithChild(middleColElement, 'div', 'bit', 9, '0');
const rightColBits = FillElementWithChild(rightColElement, 'div', 'bit', 9, '0');
const diagonalBits = FillElementWithChild(diagonalElement, 'div', 'bit', 9, '0');
const antiDiagonalBits = FillElementWithChild(antiDiagonalElement, 'div', 'bit', 9, '0');

SetBitboardText(topRowMask, topRowBits);
SetBitboardText(middleRowMask, middleRowBits);
SetBitboardText(bottomRowMask, bottomRowBits);
SetBitboardText(leftColMask, leftColBits);
SetBitboardText(middleColMask, middleColBits);
SetBitboardText(rightColMask, rightColBits);
SetBitboardText(diagonalMask, diagonalBits);
SetBitboardText(antiDiagonalMask, antiDiagonalBits);