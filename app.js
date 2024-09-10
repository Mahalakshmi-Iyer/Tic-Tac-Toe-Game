let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = false;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count++;
        if(turn0){ //player O's turn
            box.classList.add("changecolor");
            box.innerText = "O";
            turn0 = false;
        }
        else{ //player X's turn
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        let isWin = checkWinner();
        if(!isWin){
            checkDraw();
        }
    })
});

const resetGame = () =>{
    turn0 = false;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("changecolor");
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, The winner is Player ${winner}`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
    disableBoxes();
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
}

const checkDraw = () =>{
    if(count === 9){
        msg.innerText = 'The game is a draw!';
        msgContainer.classList.remove("hide");
        resetBtn.classList.add("hide");
        disableBoxes();
    }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);