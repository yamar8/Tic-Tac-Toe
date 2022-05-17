let cards = [];
let openX = []; //openX = [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
let openO = [];
let players = [0, 1];
let counter = 0;

let winX = [0, 0, 0]; // [0,0,0]
let winO = [0, 0, 0]; // [0,0,0]

function createSign(sign, element, id) {
  return {
    sign: sign,
    element: element,
    id: id,
  };
}

const clickHandle = (e) => {
  if (counter == 0) {
    openX.push(JSON.parse(e.target.id));
    e.target.innerHTML = "X";
    counter++;
    console.log("it's x turn");
    if(isXwin()){
      alert("x is win!");
    }
  } else {
    openO.push(JSON.parse(e.target.id));
    e.target.innerHTML = "O";
    counter--;
    console.log("it's y turn");
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

function isXwin() {
  //openX = [{i: 1, j: 0},{i: 0, j: 2},{i: 1, j: 1},{i: 1, j: 0},{i: 2, j: 2}]
  //winX =  [0,0,0]
  winX = [0, 0, 0]; // initialize winX in each iteration
  for (let k = 0; k < openX.length; k++) {
    console.log(openX[k].i);
    winX[openX[k].i]++;
    if (winX[openX[k].i] == 3) {
      return true;
    }
  }
  return false;
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
