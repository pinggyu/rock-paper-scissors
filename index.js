const moves = document.querySelectorAll('.buttons button')

const playerMoveBox = document.getElementById('player-move');
const compMoveBox = document.getElementById('comp-move');
const resultBox = document.getElementById('results-score');
const compScoreBox = document.getElementById('computer-score');
const playerScoreBox = document.getElementById('player-score');

const reset = document.getElementById('reset');

const playerMoveText = document.createElement('p');
const compMoveText = document.createElement('p');
const resultText = document.createElement('p');

let compScore = 0;
let playerScore = 0;

// Play a round
moves.forEach(button => button.addEventListener('click', playRound))

// Reset game 
reset.addEventListener('click', function(e){
    location.reload();
})

// Function to generate a random computer play using Math.random()
function computerPlay() {
    const compMoves = ["Rock", "Paper", "Scissors"]
    return compMoves[Math.floor(Math.random() * compMoves.length)];
}

// Main function to play through the game
function playRound(event) {

    // player move
    const playerSelection = event.target.textContent;
    playerMoveText.textContent = `You played ${playerSelection}.`;
    playerMoveBox.style.cssText = "background-color: var(--clr-primary)";
    playerMoveBox.appendChild(playerMoveText);

    // computer move
    const compSelection = computerPlay();
    compMoveText.textContent = `Computer played ${compSelection}.`;
    compMoveBox.style.cssText = "background-color: var(--bg-primary)";
    compMoveBox.appendChild(compMoveText);   

    // game
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
        if (compScore === 5) {
            endGame(roundWinner);
        } else {
            announceWinner(roundWinner, playerSelection, compSelection);
        }

    } else if (
        (playerSelection === 'Rock' && compSelection === 'Scissors') || 
        (playerSelection === 'Paper' && compSelection === 'Rock') || 
        (playerSelection === 'Scissors' && compSelection === 'Paper')
        ) {
        roundWinner = "Player";
        playerScore++;
        updateScore();
        if (playerScore === 5) {
            endGame(roundWinner);
        } else {
            announceWinner(roundWinner, playerSelection, compSelection);
        }    
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

// Function to end the game when computer or player reaches 5
function endGame (roundWinner){
    if (roundWinner === 'Computer'){
        compScoreBox.style.cssText = "background-color: #FFCCCB";
        resultText.textContent = `You lost the game! Better luck next time.`;
        resultBox.appendChild(resultText);
        moves.forEach(button => button.removeEventListener('click', playRound))
    }else {
        playerScoreBox.style.cssText = "background-color: #CEFAD0";
        resultText.textContent = `Congrats, you won the game!`;
        resultBox.appendChild(resultText);
        moves.forEach(button => button.removeEventListener('click', playRound))
    }
}
