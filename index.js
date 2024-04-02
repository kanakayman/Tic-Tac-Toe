const listBox = document.getElementsByClassName("box"); 

let currentTurn = 'x';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winningColor = 'black';
let  isWinnningColor = false;


const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin(){
  if(gameBoard.length >= 3){
    for(let combo of winningCombinations){
      let [a, b, c] = combo;
      if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){ //In JavaScript, the expression gameBoard[a] === gameBoard[b] === gameBoard[c] would first compare gameBoard[a] and gameBoard[b]. If they are equal, it would then compare the result (which would be a boolean value, either true or false) with gameBoard[c].
        let id = setInterval(() => {
          winningLine(a, b, c);
        }, 100)
    
        setTimeout(() =>{
          clearInterval(id);  
          resetBoard();    // use callback so that all three async will go in sequence
        },1000)
        return true; //winning combination
      }
    }
  }
  return false; //no winning combination   
}

function winningLine(a, b, c){
  if(!isWinnningColor){
    listBox[a].style.backgroundColor = 'black';
    listBox[b].style.backgroundColor = 'black';
    listBox[c].style.backgroundColor = 'black';
    isWinnningColor = true;
  }else{
    listBox[a].style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    listBox[b].style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    listBox[c].style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    isWinnningColor = false;
  }
}

function resetBoard(){
  for(let i = 0; i < listBox.length; i++){
    listBox[i].textContent = '';
    gameBoard[i] = '';
  }
}

function fillContent(index) {
  // Check if the box is empty before allowing the player to fill it
  if (gameBoard[index] === '') {
    listBox[index].textContent = currentTurn;
    gameBoard[index] = currentTurn;
    console.log(gameBoard)
    checkWin();
    currentTurn = currentTurn === 'x' ? 'o' : 'x';
  }
}

function addClick(){
  for(let i  = 0; i < listBox.length; i++){
    listBox[i].addEventListener("click", () => {
      fillContent(i);
    })
  };
}
  
document.getElementById('reset').addEventListener('click', resetBoard);
addClick();

