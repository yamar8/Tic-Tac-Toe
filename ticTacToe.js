let cards = [];
let open = []; //open = [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
let openSaved = [];
let TurnOfX = false;
let TurnOfXsaved = false;
let sequence = []; // [0, 0, 0];
let boardSize = 3;
let savedIndex = 0;

createUndoButton();
createNewGameButton();
createSaveGameButton();
createLoadGameButton();

/* 3X3 board illustration: 

{i: 0, j: 0},{i: 0, j: 1},{i: 0, j: 2}
{i: 1, j: 0},{i: 1, j: 1},{i: 1, j: 2}
{i: 2, j: 0},{i: 2, j: 1},{i: 2, j: 2}
*/

function createSign(sign, element, id) {
  return {
    sign: sign,
    element: element,
    id: id,
  };
}
function createUndoButton() {
  const undoEl = document.getElementById("undo");
  undoEl.addEventListener("click", () => {
    undo();
  });
}
function createNewGameButton() {
  const newGameEl = document.getElementById("newgame");
  newGameEl.addEventListener("click", () => {
    while (open.length > 0) {
      undo();
    }
  });
}

function createSaveGameButton() {
  const saveGameEl = document.getElementById("savegame");
  saveGameEl.addEventListener("click", () => {
    saveGame();
  });
}
function createLoadGameButton() {
  const saveGameEl = document.getElementById("loadgame");
  saveGameEl.addEventListener("click", () => {
    loadGame();
  });
}

function saveGame() {

  savedIndex = open.length; // last index 

  for (let i = 0; i < open.length; i++) {
    openSaved.push(open[i]);
  }


}

//   TurnOfXsaved = TurnOfX;
// }

function loadGame() {
  let undoCounter = open.length - savedIndex;
  while (undoCounter > 0) {
    undo();
    undoCounter--;
  }
}

function redo() {
  let index = open.length;
  open.push(openSaved[index]);
  let i = openSaved[index].i;
  let j = openSaved[index].j;
  cards[i][j].innerHTML = TurnOfX ? "x" : "o";
  TurnOfX = !TurnOfX;
}
// function loadGame() {
//   ///////need to fix open array in load game.
//   TurnOfX = TurnOfXsaved;
//   let open = [];
//   for (let i = 0; i < openSaved.length; i++) {
//     open.push(openSaved[i]);
//   }
//   openSaved = [];
//   console.log(open);
//   //clean all the board signs
//     for (let i = 0; i < cards.length; i++) {
//     for (let j = 0; j < cards[i].length; j++) {
//       cards[i][j].innerHTML = "";
//     }
//   }

//   for(let k =0;k<open.length;k++){
//     let i = open[k].i;
//     let j = open[k].j;
//     if(k%2 == 0){
//       cards[i][j].innerHTML = "o";
//     }else{
//       cards[i][j].innerHTML = "x";
//     }
//   }


// for (let i = 0; i < cards.length; i++) {
//   for (let j = 0; j < cards[i].length; j++) {
//     console.log("cards[i][j].id: " + cards[i][j].id);
//     console.log("open[i]: " + JSON.stringify[open[i]]);
//     if (cards[i][j].id == JSON.stringify[open[i]]) {
//       cards[i][j].innerHTML = "x";
//     }
//   }
// }


function undo() {
  if (open.length == 0) {
    return;
  }
  let lastCell = open.length - 1;
  let i = open[lastCell].i;
  let j = open[lastCell].j;
  cards[i][j].innerHTML = "";
  open.pop();
  TurnOfX = !TurnOfX;
}

function sequenceInit() {
  sequence = [];
  for (let i = 0; i < boardSize; i++) {
    sequence.push(0);
  }
}

const clickHandle = (e) => {
  open.push(JSON.parse(e.target.id));

  if (isWin()) {
    setTimeout(() => {
      alert("we have a winner"),
        12500;
    })
  }
  if (TurnOfX) {
    e.target.innerHTML = "X";
    // console.log("it's x turn");
    TurnOfX = false;
  } else {
    e.target.innerHTML = "O";
    // console.log("it's O turn");
    TurnOfX = true;
  }
};

createBoard(boardSize);

function createBoard(boardSize) {
  const board = document.getElementById("board");
  board.style.gridTemplateColumns = "150px ".repeat(boardSize);
  let counter = 0;
  for (let i = 0; i < boardSize; i++) {
    // console.log(board.style.gridTemplateColumns);
    cards.push([]); // cards = [[],[],[]]
  }
  for (let i = 0; i < boardSize; i++) {
    for (let j = cards[i].length; j < boardSize; j++) {
      // debugger;
      const element = createCardEl(counter);
      element.id = JSON.stringify({ i, j });
      cards[i].push(element);
      board.append(element);
      element.addEventListener("click", clickHandle);
    }
  }
  // console.log(cards);
}

function createCardEl(idx) {
  const cardEl = document.createElement("div");
  cardEl.id = idx;
  cardEl.className = "card";
  return cardEl;
}

function isWin() {
  console.log(fullRow(), fullColumn(), rtlDiagonal(), ltrDiagonal());
  return fullRow() || fullColumn() || rtlDiagonal() || ltrDiagonal();
}

function fullRow() {
  //open array looks like this: [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
  //rowWin array looks like this: [0,0,0]
  let k = Number(TurnOfX); // k  = 1 or 0 according to the current turn
  sequenceInit(); // initialize sequence array in each iteration
  for (; k < open.length; k += 2) {
    //  iterate on even cells
    sequence[open[k].i]++;
    if (sequence[open[k].i] == boardSize) {
      return true;
    }
  }
  return false;
}

function fullColumn() {
  //open array looks like this: [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
  //rowWin array looks like this: [0,0,0]
  let k = Number(TurnOfX); // k  = 1 or 0 according to the current turn
  sequenceInit(); // initialize rowWin in each iteration
  for (; k < open.length; k += 2) {
    sequence[open[k].j]++;
    if (sequence[open[k].j] == boardSize) {
      return true;
    }
  }
  return false;
}

function rtlDiagonal() {
  let counter = 0;
  let k = Number(TurnOfX);
  for (; k < open.length; k += 2) {
    counter++;
    if (open[k].i != open[k].j) {
      return false;
    }
  }
  if (counter == boardSize) {
    return true;
  }
}

function ltrDiagonal() {
  //left to rigth diagonal win
  let counter = 0;
  let k = Number(TurnOfX);
  for (; k < open.length; k += 2) {
    counter++;
    if (((open[k].i) + (open[k].j)) != 2) {
      return false;
    }
  }
  if (counter == boardSize) {
    return true;
  }
}
