const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["","","","","","","","",""];

const human = "X";
const ai = "O";

cells.forEach(cell => {
    cell.addEventListener("click", playerMove);
});

function playerMove(event){

    let index = event.target.dataset.index;

    if(board[index] !== "")
        return;

    board[index] = human;
    event.target.textContent = human;

    if(checkWinner(board,human)){
        statusText.textContent = "You Win!";
        return;
    }

    if(isDraw()){
        statusText.textContent = "Draw!";
        return;
    }

    aiMove();
}
function aiMove(){

    let bestScore = -Infinity;
    let move;

    for(let i=0;i<9;i++){

        if(board[i] === ""){

            board[i] = ai;

            let score = minimax(board,0,false);

            board[i] = "";

            if(score > bestScore){
                bestScore = score;
                move = i;
            }
        }
    }

    board[move] = ai;

    cells[move].textContent = ai;

    if(checkWinner(board,ai)){
        statusText.textContent = "AI Wins!";
        return;
    }

    if(isDraw()){
        statusText.textContent = "Draw!";
    }
}
function minimax(board, depth, isMaximizing){

    if(checkWinner(board, ai))
        return 10;

    if(checkWinner(board, human))
        return -10;

    if(board.every(cell => cell !== ""))
        return 0;

    if(isMaximizing){

        let bestScore = -Infinity;

        for(let i=0;i<9;i++){

            if(board[i] === ""){

                board[i] = ai;

                let score = minimax(board, depth+1, false);

                board[i] = "";

                bestScore = Math.max(score,bestScore);
            }
        }

        return bestScore;
    }

    else{

        let bestScore = Infinity;

        for(let i=0;i<9;i++){

            if(board[i] === ""){

                board[i] = human;

                let score = minimax(board, depth+1, true);

                board[i] = "";

                bestScore = Math.min(score,bestScore);
            }
        }

        return bestScore;
    }
}
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner(board, player){

    return winPatterns.some(pattern => {

        return pattern.every(index => {

            return board[index] === player;
        });
    });
}

function isDraw(){

    return board.every(cell => cell !== "");
}
function restartGame(){

    board = ["","","","","","","","",""];

    cells.forEach(cell => {
        cell.textContent = "";
    });

    statusText.textContent = "";
}