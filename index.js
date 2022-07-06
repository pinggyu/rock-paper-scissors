// Generate the computer's move using Math.random()

const compMoves = ["Rock", "Paper", "Scissors"]

function computerPlay() {
    // returns an index based on a random number generated by Math.random(), added -1 to include index 0
    return compMoves[Math.floor(Math.random() * compMoves.length)];
}

let playerSelection = capitalize(prompt("What's your move?"));
let computerSelection = computerPlay();

console.log(playerSelection);
console.log(computerSelection);

// Capitalize first letter only
function capitalize(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        console.log("It's a draw!");
    } else if ( (playerSelection === 'Rock' && computerSelection === 'Paper') || (playerSelection === 'Paper' && computerSelection === 'Scissors') || (playerSelection === 'Scissors' && computerSelection === 'Rock') ){
        console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
    } else if ((playerSelection === 'Rock' && computerSelection === 'Scissors') || (playerSelection === 'Paper' && computerSelection === 'Rock') || (playerSelection === 'Scissors' && computerSelection === 'Paper')){
        console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
    } else{
        console.log(`Please insert a valid move to play (rock, paper or scissors).`);
    }
}

console.log(playRound(playerSelection, computerSelection));