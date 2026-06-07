function SetBitboardText(bitboard, boxes) {
  if (!boxes) {
    console.error('Error: boxes is null');
    return;
  }
  for (let i = 0; i < boxes.length; i++) {
    const bitValue = (bitboard >> i) & 1;
    boxes.item(i).innerText = bitValue;
  }
}

function CheckBitboardWin(board, winConditions) {
  if (!winConditions) {
    console.error('Error: winConditions is null');
    return false;
  }
  return winConditions.some((condition) => (board & condition) === condition);
}

function CreateDescriptor(element, text) {
  const container = document.createElement('div');
  container.classList.add('descriptor');

  const title = document.createElement('h3');
  title.innerText = name;
  container.appendChild(title);
  element.appendChild(container);
  return container;
}

function FillElementWithChild(
  element,
  elementName,
  childClassName,
  amount,
  childText = '0',
) {
  if (!element) {
    console.log(`Error: Element is null`);
    return null;
  }
  for (let i = 0; i < amount; ++i) {
    const child = document.createElement(elementName);
    child.classList.add(childClassName);
    child.innerText = childText;
    element.appendChild(child);
  }
  return element.querySelectorAll(`.${childClassName}`);
}

function SetText(element, text) {
  if (!element) {
    console.error('SetText: invalid element');
    return;
  }

  element.innerText = text;
}
