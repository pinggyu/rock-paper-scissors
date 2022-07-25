const moves = document.querySelectorAll('.buttons button')
const compMoveBox = document.getElementById('comp-move');
const resultBox = document.getElementById('results-score');
const compScoreBox = document.getElementById('computer-score');
const playerScoreBox = document.getElementById('player-score');
const playerMoveBox = document.getElementById('player-move');
const reset = document.getElementById('reset');

const playerMoveText = document.createElement('p');
const compMoveText = document.createElement('p');
const resultText = document.createElement('p');

let compScore = 0;
let playerScore = 0;
// let enableClick = true;
// init method that will run when app first loads

function init() {

    moves.forEach(button => button.addEventListener('click', playGame))

}

// Reset game 
reset.addEventListener('click', function(e){
    location.reload();
})

// Main function to play through the game
function playGame(event) {
    // if (enableClick) {

    // pointerEvents prevent user from clicking new moves until the round ends and disables hover effects
    // enableClick = false; => this is better industry practice
    moves.forEach(button => button.style.pointerEvents = "none");

    // get user pick & display it 
    const playerSelection = event.target.textContent;
    setTimeout(() => { displayPlayerMove(playerSelection) }, 500);

    // get computer pick & display it
    const compSelection = getCompMove();
    setTimeout(() => { displayCompMove(compSelection) }, 1000);

    // play a round with input (userpick and computer pick)
    setTimeout(() => { playRound(playerSelection, compSelection) }, 1500);
          
    // }
}

// Function to display player move
function displayPlayerMove(playerMove) {
    playerMoveText.textContent = `You played ${playerMove}.`;
    playerMoveBox.style.cssText = "background-color: var(--clr-primary)";
    playerMoveBox.appendChild(playerMoveText);
}

// Function to generate a random computer play using Math.random()
function computerPlay() {
    const compMoves = ["Rock", "Paper", "Scissors"]
    return compMoves[Math.floor(Math.random() * compMoves.length)];
}

// Function to get comp move
function getCompMove() {
    return computerPlay();
}

// Function to display comp move
function displayCompMove(compMove) {
    compMoveText.textContent = `Computer played ${compMove}.`;
    compMoveBox.style.cssText = "background-color: var(--bg-primary)";
    compMoveBox.appendChild(compMoveText);
}

// Function to play a round
function playRound(playerSelection, compSelection){
    let roundWinner;
    if (playerSelection === compSelection) {
        roundWinner = "Draw";
        updateScore();
        announceWinner(roundWinner, playerSelection, compSelection);
    } else if (
        (playerSelection === 'Rock' && compSelection === 'Paper') ||
        (playerSelection === 'Paper' && compSelection === 'Scissors') ||
        (playerSelection === 'Scissors' && compSelection === 'Rock')
    ) {
        roundWinner = "Computer";
        compScore++;
        updateScore();
        announceWinner(roundWinner, playerSelection, compSelection);
    } else if (
        (playerSelection === 'Rock' && compSelection === 'Scissors') ||
        (playerSelection === 'Paper' && compSelection === 'Rock') ||
        (playerSelection === 'Scissors' && compSelection === 'Paper')
    ) {
        roundWinner = "Player";
        playerScore++;
        updateScore();
        announceWinner(roundWinner, playerSelection, compSelection);
    }
    // end the game if compscore or playerscore reaches 5
    if (isGameOver()) {
        endGame();
    }else {
        // reset round
        setTimeout(resetRound, 1800);
    }
}

// Update the scoreboard
function updateScore(){
    compScoreBox.textContent = `Computer: ${compScore}`;
    playerScoreBox.textContent = `Player: ${playerScore}`;
}

// Function to announce a winner after a non game ending round
function announceWinner (roundWinner, playerSelection, compSelection){
    if (roundWinner === 'Computer'){
        resultText.textContent = `You lost this round! ${compSelection} beats ${playerSelection}.`;
        resultBox.style.cssText = "background-color: var(--bg-primary)";
        resultBox.appendChild(resultText);
    } else if (roundWinner === 'Player'){
        resultText.textContent = `You won this round! ${playerSelection} beats ${compSelection}.`;
        resultBox.style.cssText = "background-color: var(--bg-primary)";
        resultBox.appendChild(resultText);      
    } else {
        resultText.textContent = `It's a draw!`;
        resultBox.style.cssText = "background-color: var(--bg-primary)";
        resultBox.appendChild(resultText);   
    }
}

// Function to reset round
function resetRound() {
    playerMoveText.textContent = '';
    compMoveText.textContent = '';
    resultText.textContent = '';
    playerMoveBox.style.cssText = "background-color: var(--clr-white)";
    compMoveBox.style.cssText = "background-color: var(--clr-white)";
    resultBox.style.cssText = "background-color: var(--clr-white)";

    // enableClick = true;

    // revert hover to default & enable user to click again
    moves.forEach(button => button.style.pointerEvents = "auto");
}

// Function to check if computer or player score reached 5
function isGameOver(){
    return (compScore === 5 || playerScore === 5);
}

// Function to display ending game message and disable event listeners
function endGame (){
    if (compScore > playerScore){
        compScoreBox.style.cssText = "background-color: #FFCCCB";
        resultText.textContent = `You lost the game! Better luck next time.`;
        resultBox.appendChild(resultText);
        moves.forEach(button => button.removeEventListener('click', playGame))
    }else {
        playerScoreBox.style.cssText = "background-color: #CEFAD0";
        resultText.textContent = `Congrats, you won the game!`;
        resultBox.appendChild(resultText);
        moves.forEach(button => button.removeEventListener('click', playGame))
    }
}

//initialize the app
init();