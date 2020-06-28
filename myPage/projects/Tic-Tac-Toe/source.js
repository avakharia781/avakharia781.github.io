const   X_CLASS = 'x';
const   CIRCLE_CLASS = 'circle';
const   cellElements = document.querySelectorAll('[data-cell]');
const   board = document.getElementById('board');
const   WinningMessage = document.querySelector('[data-winning-message-text]');
const   WinningMessagElement = document.getElementById('winningMessage')
const   restart = document.getElementById('restart');
const   xScoreId = document.getElementById('xScore');
const   oScoreId = document.getElementById('oScore');
const   totalId = document.getElementById('total');
const   WINNING_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let circleTurn;
let bgColor = 'white';
let   scoreX = 0;
let   scoreO = 0;
let   total  = 0;

startGame();    
restart.addEventListener('click', startGame);

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick,{once:true})
    });
    setBoardHover();
    WinningMessagElement.classList.remove('show');
}

function handleClick(e){
    //place Mark
    //Check for Win
    //Check for Draw
    //Switch Turns

    const cell = e.target;
    console.log(e.target);
    const currentClass = circleTurn?CIRCLE_CLASS:X_CLASS;
    placeMark(cell, currentClass);
    if(checkForWin(currentClass)){
        console.log('Winner'+currentClass)
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    } else{
        swapTurn();
        setBoardHover();
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurn(){
    circleTurn = !circleTurn;
}

function setBoardHover(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

function checkForWin(currentClass){
    return WINNING_COMBOS.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    });
}

function endGame(draw){
    if(draw){
        WinningMessage.innerHTML = "It's a Draw!";
        bgColor = '#f52525';
    }else{
        WinningMessage.innerText = `${circleTurn ? "O's":"X's"} Wins!`;
        if(circleTurn){
            bgColor = '#45ff38'
            scoreO += 1;
        }else{
            bgColor = '#4267f5'
            scoreX += 1;
        }
    }
    total += 1;
    var text = document.createTextNode(`${scoreX}`);
    xScoreId.innerHTML = 'X: '+scoreX;
    oScoreId.innerHTML = 'O: '+scoreO;
    totalId.innerHTML = 'Total: '+total;
    WinningMessagElement.classList.add('show'); 
    WinningMessagElement.style.color = bgColor;
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    });
}