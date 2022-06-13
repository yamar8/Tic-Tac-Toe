const namesEl = document.querySelector("#namesText");
const player1El = document.querySelector("#player1Name");
const player2El = document.querySelector("#player2Name");
player1El.className = "currentPlayer"; // game always start with the first player.
let cards = [];
let open = []; //open = [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
// let open = localStorage.open; //open = [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
let openSaved = [];
let TurnOfXsaved = false;
let sequence = []; // [0, 0, 0];
let boardSize = 3;
let savedIndex = 0;
let player1 = "";
let player2 = "";
localStorage.open; // = JSON.stringify([]);
localStorage.player1;
localStorage.player2;
localStorage.boardSize;
let intervalID;
let totalSeconds = 0; // total second of the clock.
let totalSecondsSaved; // saved game total seconds
const body = document.querySelector("body");
body.style.backgroundImage = 'url("./pics/openingbg.jpg")';


createLoadGameFromLocalStorageButton();
createUndoButton();
createNewGameButton();
createSaveGameButton();
createLoadGameButton();

/* 3X3 board illustration: 

{i: 0, j: 0},{i: 0, j: 1},{i: 0, j: 2}
{i: 1, j: 0},{i: 1, j: 1},{i: 1, j: 2}
{i: 2, j: 0},{i: 2, j: 1},{i: 2, j: 2}
*/


function createUndoButton() {
  const undoEl = document.getElementById("undo");
  undoEl.innerHTML = '<img src="./pics/undo.png" width="94px" height="98px"/>';
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
    namesEl.innerHTML = "";
    namesEl.append(player1El, player2El);
    createNamesOnScreen();

    clearInterval(intervalID);
    totalSeconds = 0;
    clock();

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
function createLoadGameFromLocalStorageButton() {
  const loadGameFromLocalStorageEl = document.getElementById(
    "loadGameFromLocalStorage"
  );
  loadGameFromLocalStorageEl.addEventListener("click", () => {
    loadGameFromLocalStorage();
  });
}
function loadGameFromLocalStorage() {
  // debugger
  player1 = localStorage.player1;
  player2 = localStorage.player2;
  boardSize = localStorage.boardSize;
  createBoard(boardSize);
  createNamesOnScreen();
  loadFromLocalStorage();
  turnOfX();
}

//!!!!!!!!!!!! maby it is not needed because the turn determined by the open array length
// upDateTurnOFX()
// function upDateTurnOFX() {
//   if (JSON.parse(localStorage.open).length % 2 == 0) {
//     TurnOfX = false;
//   }
//   TurnOfX = true;
// }


function loadFromLocalStorage() {
  while (open.length != JSON.parse(localStorage.open).length) {
    let index = open.length;
    let i = JSON.parse(localStorage.open)[index].i;
    let j = JSON.parse(localStorage.open)[index].j;
    cards[i][j].innerHTML = turnOfX() ? "X" : "O";
    open.push(JSON.parse(localStorage.open)[index]); // i moved the line
  }
}
function updatelocalStorage() {
  localStorage.open = JSON.stringify(open);
}

function saveGame() {
  savedIndex = open.length; // last index
  totalSecondsSaved = totalSeconds;
  for (let i = 0; i < open.length; i++) {
    openSaved.push(open[i]);
  }
}


function loadGame() {
  totalSeconds = totalSecondsSaved;
  if (open > openSaved) {
    let undoCounter = open.length - savedIndex;
    while (undoCounter > 0) {
      undo();
      undoCounter--;
    }
  } else {
    while (open.length != openSaved.length) {
      redo();
    }
  }
}

//redo function redo one turn according to the openSaved array.
function redo() {
  let index = open.length;
  let i = openSaved[index].i;
  let j = openSaved[index].j;
  console.log(turnOfX());
  cards[i][j].innerHTML = turnOfX() ? "X" : "O";
  open.push(openSaved[index]);
}

//undo function undo one turn (going back one index in open array)
function undo() {
  if (open.length == 0) {
    return;
  }
  let lastCell = open.length - 1;
  let i = open[lastCell].i;
  let j = open[lastCell].j;
  cards[i][j].innerHTML = "";
  open.pop();
  turnOfX();
}

function sequenceInit() {
  sequence = [];
  for (let i = 0; i < boardSize; i++) {
    sequence.push(0);
  }
}

const clickHandle = (e) => {
  if (
    !open.some(
      (open) =>
        open.i === JSON.parse(e.target.id).i &&
        open.j === JSON.parse(e.target.id).j
    )
  ) {
    // console.log(JSON.parse(e.target.id).i);
    e.target.className = turnOfX() ? "X" : "O"; // this line must be before the push, in order to work properly (the turn is determined by the array length)
    open.push(JSON.parse(e.target.id));
    if (isWin()) {
      localStorage.minLength = open.length;
      clearInterval(intervalID);
      namesEl.innerHTML = !turnOfX() ? "X is the winner" : "O is the winner";
    }
    updatelocalStorage();
  }
};

playersInputs();
function playersInputs() {
  const formEl = document.querySelector("#userform");

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    player1 = e.target.player1.value;
    player2 = e.target.player2.value;
    boardSize = e.target.boardSize.value;
    createNamesOnScreen();
    createBoard(boardSize);
    updatelocalStorageNamesAndBboardSize();
    clock();
    formEl.remove();
  });
}
function updatelocalStorageNamesAndBboardSize() {
  localStorage.player1 = player1;
  localStorage.player2 = player2;
  localStorage.boardSize = boardSize;
}

function createNamesOnScreen() {
  player1El.innerHTML = player1;
  player2El.innerHTML = player2;

  // console.log(namesEl.player1Name);
}

function createBoard(boardSize) {
  // debugger;
  body.style.backgroundImage = 'url("./pics/gamebg.jpg")'
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
  let k = Number(turnOfX()); // k  = 1 or 0 according to the current turn
  console.log(k);
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
  let k = Number(turnOfX()); // k  = 1 or 0 according to the current turn
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
  let k = Number(turnOfX());
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
  let k = Number(turnOfX());
  for (; k < open.length; k += 2) {
    counter++;
    if (open[k].i + open[k].j != boardSize - 1) {
      return false;
    }
  }
  if (counter == boardSize) {
    return true;
  }
}

// loadFromLocalStorage()

function turnOfX() {
  if (open.length % 2 == 0) {
    player1El.className = "currentPlayer";
    player2El.className = "";
    return true;
  }
  player2El.className = "currentPlayer";
  player1El.className = "";
  return false;
}
// countUpTimer();
// function countUpTimer(){

//   let start = Date.now();
// setInterval(function() {
//     let delta = Date.now() - start; // milliseconds elapsed since start
//     console.log(Math.floor(delta / 1000)); // in seconds
//     // alternatively just show wall clock time:
//     // console.log(new Date().toUTCString());
// }, 1000); // update about every second
// }

function clock() {

  const minutesLabel = document.getElementById("minutes");
  const secondsLabel = document.getElementById("seconds");

  // let totalSeconds = 0;

  intervalID = setInterval(setTime, 1000);

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

}

