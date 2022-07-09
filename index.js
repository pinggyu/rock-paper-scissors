/* =========================
 * Steps:
 * 1. Query for moves choice buttons and store in variable 
 * 2. Query for player move chat box and store in variable
 * 3. addEventListener on buttons (prevent default?) & store player selection in a variable, on click, print out "You played _ " chat bubble
 * 4. Run computerPlay() to get computer move and append that to the computer move chat bubble "Computer played _"
 * 5. Query for results-score
 * 6. Run playRound() and append "You won/lost this round. _ beats _." to the results-score div p
 * 7. Play again option
 * ======================== */

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

console.log(moves);

// play a round
moves.forEach(button => button.addEventListener('click', playRound))

// reset game 
reset.addEventListener('click', function(e){
    location.reload();
})

// FUNCTIONS

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
    playerMoveBox.appendChild(playerMoveText);

    // computer move
    const compSelection = computerPlay();
    compMoveText.textContent = `Computer played ${compSelection}.`;
    compMoveBox.appendChild(compMoveText);   

    // game
    let roundWinner;
    if (playerSelection === compSelection) {
        roundWinner = "Draw";

        updateScore();        
        
        resultText.textContent = `It's a draw!`;
        resultBox.appendChild(resultText);

    } else if (
        (playerSelection === 'Rock' && compSelection === 'Paper') || 
        (playerSelection === 'Paper' && compSelection === 'Scissors') || 
        (playerSelection === 'Scissors' && compSelection === 'Rock')
        ) {
        roundWinner = "Computer";

        compScore++;
        updateScore(); 
        
        if (compScore === 5){
            compScoreBox.style.cssText = "background-color: #FFCCCB";
            resultText.textContent = `You lost the game! Better luck next time.`;
            resultBox.appendChild(resultText);
            moves.forEach(button => button.removeEventListener('click', playRound))
        }else{
            resultText.textContent = `You lost this round! ${compSelection} beats ${playerSelection}.`;
            resultBox.appendChild(resultText);
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
            playerScoreBox.style.cssText = "background-color: #CEFAD0";
            resultText.textContent = `Congrats, you won the game!`;
            resultBox.appendChild(resultText);
            moves.forEach(button => button.removeEventListener('click', playRound))
        } else {
            resultText.textContent = `You won this round! ${playerSelection} beats ${compSelection}.`;
            resultBox.appendChild(resultText);
        }
    }

}

function updateScore(){
    compScoreBox.textContent = `Computer: ${compScore}`;
    playerScoreBox.textContent = `Player: ${playerScore}`;
}

function announceMove(source){

}

function announceResults(winner){

}
