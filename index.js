// Function to generate a random computer play using Math.random()
function computerPlay() {
    const compMoves = ["Rock", "Paper", "Scissors"]
    return compMoves[Math.floor(Math.random() * compMoves.length)];
}

// Helper function to capitalize only the first letter of a string
function capitalize(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

// Function to determine player win/ loss for a single round
function playRound(playerSelection, computerSelection) {
    let winner;
    if (playerSelection === computerSelection) {
        console.log("It's a draw!");
        winner = "Draw";
    } else if (
        (playerSelection === 'Rock' && computerSelection === 'Paper') || 
        (playerSelection === 'Paper' && computerSelection === 'Scissors') || 
        (playerSelection === 'Scissors' && computerSelection === 'Rock')
        ) {
        console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
        winner = "Computer";
    } else if (
        (playerSelection === 'Rock' && computerSelection === 'Scissors') || 
        (playerSelection === 'Paper' && computerSelection === 'Rock') || 
        (playerSelection === 'Scissors' && computerSelection === 'Paper')
        ) {
        console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
        winner = "Player";
    } 
    return winner;
}

// Function to determine overall game winner (assume best out of 5 or more if there is a draw)
function game() {
    let playerScore = 0;
    let compScore = 0;
    let playerSelection;
    let computerSelection;
    let roundWinner;
    for (let i = 0; i < 5; i ++){
        playerSelection = capitalize(prompt("What's your move?"));
        computerSelection = computerPlay();
        roundWinner = playRound(playerSelection, computerSelection);
        if (roundWinner === "Computer") {
            compScore++;
        } else if (roundWinner === "Player"){
            playerScore++;
        } else if (roundWinner === "Draw"){
            i--;
        }
        console.log(playerSelection);
        console.log(computerSelection);
        console.log(playerScore);
        console.log(compScore);
    }
    
    if (playerScore > compScore){
        console.log(`You won!`);
    } else if (playerScore < compScore)  {
        console.log(`You lost!`);
    } else {
        console.log(`It's a draw!`);
    }
}

game();