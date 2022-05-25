let cards = [];
let open = []; //open = [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
let openO = [];
let TurnOfX = false;
let counter = 0;

/* 3X3 board illustration: 

{i: 0, j: 0},{i: 0, j: 1},{i: 0, j: 2}
{i: 1, j: 0},{i: 1, j: 1},{i: 1, j: 2}
{i: 2, j: 0},{i: 2, j: 1},{i: 2, j: 2}
*/

let rowWin = [0, 0, 0];
let winO = [0, 0, 0]; // [0,0,0]

function createSign(sign, element, id) {
  return {
    sign: sign,
    element: element,
    id: id,
  };
}

const clickHandle = (e) => {
 
  open.push(JSON.parse(e.target.id));
  if (TurnOfX) {
    e.target.innerHTML = "X";
    console.log("it's x turn");
    
    if(isWin()){
      alert("x is win!");
    }
    TurnOfX = false;
  } else {
    e.target.innerHTML = "O";
    console.log("it's y turn");
    if(isWin()){
      alert("y is win");
    }
    TurnOfX = true;
  }
};

createBoard(3);

function createBoard(boardSize) {
  const board = document.getElementById("board");
  let counter = 0;
  for (let i = 0; i < boardSize; i++) {
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
  console.log(cards);
}

function createCardEl(idx) {
  const cardEl = document.createElement("div");
  cardEl.id = idx;
  cardEl.className = "card";
  return cardEl;
}

function fullRow(){
  //open array looks like this: [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
  //rowWin array looks like this: [0,0,0]
  let k = Number(TurnOfX); // k  = 1 or 0 according to the current turn
  rowWin = [0, 0, 0]; // initialize rowWin in each iteration
  for (; k < open.length; k+=2) { //  iterate on even cells
    console.log(open[k].i);
    rowWin[open[k].i]++;
    console.log("winx: " + rowWin)
    if (rowWin[open[k].i] == 3) {
      return true;
    }
  }
  return false;
}


function isWin() {
  return fullRow();
}

function boardSize() {}

function player(counter) {}

// var i= 1
// var j=2

// const el={}
// el.id = JSON.stringify({i,j})
// console.log(el);
// var {i,j} = JSON.parse(el.id)
// console.log(j);

// function row(i){
//  let counter = 0;
//   if(i==0){
//     counter++
//   }
//   if(counter==3){
//     console.log("win");
//   }

// }
// function column(j){

// }
// function upToDown(i,j){

// }
// function DownToUp(i,j){

// }


