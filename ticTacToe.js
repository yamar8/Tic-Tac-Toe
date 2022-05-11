let cards = [];
let openCards = [];

function createSign(sign,element) {
  return {
    sign: sign,
    element: element
  };
}

createBoard(3);

function createBoard(boardSize) {
  const board = document.getElementById("board");
  let counter = 0;
  for (let i = 0; i < boardSize; i++) {
    cards.push([]);
  }
  for (let i = 0; i < boardSize; i++) {
    for (let j = cards[i].length; j < boardSize; j++) {
      // debugger;
      const element = createCardEl(counter);
      cards[i].push(element);
      board.append(element);
      element.addEventListener("click",()=>{

        element.innerText ="0";
        

      });
    }
  }
  console.log(cards);
}

function createCardEl(idx) {
  const cardEl = document.createElement("div");
  cardEl.id = idx;
  cardEl.className = "card";
  return cardEl;
}

