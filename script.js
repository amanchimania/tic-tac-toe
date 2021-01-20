const statusDisplay = document.querySelector(".game--status");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "",""];
const winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
//why function and not simple variable
const winningMessage = () => `Player ${currentPlayer} has won`;
const drawMessage = () => `Gamer ended with a draw`;
const currentPlayerTurn=()=>`Its ${currentPlayer} turn`
statusDisplay.innerHTML=currentPlayerTurn();

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex]=currentPlayer;
    clickedCell.innerHTML=currentPlayer;
}
function handlePlayerChange(){
    currentPlayer=currentPlayer==="X"?"O":"X";
    statusDisplay.innerHTML=currentPlayerTurn();
}

function handleResultValidation(){
    let roundWon=false;
    //check for each winning condition 
    for(let i=0;i<winningConditions.length;i++){
        const winningCondition=winningConditions[i];

        let a=gameState[winningCondition[0]];
        let b=gameState[winningCondition[1]];
        let c=gameState[winningCondition[2]];

        if(a==="" || b==="" || c===""){
            continue;
    }
    if(a===b && b===c){
        roundWon=true;
        break;
    }
    }
    if(roundWon){
        statusDisplay.innerHTML=winningMessage();
        gameActive=false;
        return;
    }
    //handle draw condition
    let roundDraw=!gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML="draw is there ";
        gameActive=false;
        return;
    }


    handlePlayerChange();
}
function handleCellClick(clickedCellEvent){
    const clickedCell=clickedCellEvent.target;
    const clickedCellIndex=parseInt(clickedCell.getAttribute("data-cell-index"));
    console.log(clickedCellIndex)
    if(gameState[clickedCellIndex]!="" || !gameActive  ){
        return;
    }

    //if everything is fine
    //change the state of cell
    // check if somebody won after that click
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
gameActive=true;
currentPlayer="X";
gameState=["","","","","","","","",""];
statusDisplay.innerHTML=currentPlayerTurn();
document.querySelectorAll(".cell").forEach((cell)=>(cell.innerHTML=""));
}
document
    .querySelectorAll(".cell")
    .forEach(cell=>cell.addEventListener("click",handleCellClick));
document.querySelector(".game--restart").addEventListener("click",handleRestartGame);
