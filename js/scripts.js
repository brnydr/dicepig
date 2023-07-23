
//Business Logic for Game Object


// function Game() {
//     this.players = {};
//     this.currentId = 0;
//     this.roll = 0;
//     this.counter = 1;
// }

// Game.prototype.updateRollScore = function(newRoll) {
//     this.roll += newRoll;
// }

class Game {

    constructor () {
        this.players = {};
        this.currentId = 0;
        this.roll = 0;
        this.counter = 1;
    }

    updateRollScore(newRoll) {
        this.roll += newRoll;
    };

    addPlayer(player) {
        player.id = this.assignId();
        this.players[player.id] = player;
    }

    assignId() {
        this.currentId += 1;
        return this.currentId;
    }
}
//Business Logic for Player Object


class Player {
    constructor (name) {
        this.name = name;
        this.score = 0;
    }
}

function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function rollDice() {
    return getRandomNumber(1, 6);
};

function playerTurn() {
    if (rollDice() !== 1) {
        Player.score ++
    }
    if (rollDice() === 1) {
        Player.score + 0
    }
};

let game = new Game();
//Business Logic

function startGame(e) {
    e.preventDefault();
    let playerName = document.querySelector("#player1").value
    let playerName2 = document.querySelector("#player2").value
    document.getElementById("player1Name").innerText = playerName;
    document.getElementById("player2Name").innerText = playerName2;
    let newPlayer = new Player(playerName);
    let newPlayer2 = new Player(playerName2);
    game.addPlayer(newPlayer);
    game.addPlayer(newPlayer2);
    document.getElementById("startGame").classList.add('hidden');
    highlightPlayer();
}

function calculateScore() {
    let currentTotal = document.getElementById("turnTotalSum");
    if (game.counter === 1) {
       game.players["1"].score += parseInt(currentTotal.innerText);
    } else {
        game.players["2"].score += parseInt(currentTotal.innerText);
    }
    switchPlayer();
    displayScore();
    highlightPlayer();
    currentTotal.innerText = 0;
    game.roll = 0;
    determineWinner();
}

function switchPlayer() {
    if (game.counter === 1) {
        game.counter = 2;

    } else {
        game.counter = 1;
    }
    highlightPlayer();
};

function determineWinner() {
    let player1Score = parseInt(document.getElementById("player1Score").innerText);
    let player2Score = parseInt(document.getElementById("player2Score").innerText);
    if (player1Score >= 100) {
        displayWinner(game.players["1"].name);
    } else if (player2Score >= 100) {
        displayWinner(game.players["2"].name);
    } else {

    }
}

//UI Logic

//BUG: after 1 is rolled, the second player can press hold and take points accumulated in previous roll. 
function handleDiceRoll(e) {
    e.preventDefault;
    let newRoll = rollDice();
    document.querySelector("#currentRoll").innerText = newRoll;
    if (newRoll === 1) {
        game.roll = 0;
        switchPlayer();
        
    } else {
        game.updateRollScore(newRoll);
        document.querySelector("#turnTotalSum").innerText = game.roll;  
    }
}

function highlightPlayer() {
    if (game.counter === 1) {
        document.getElementById("player1Name").classList.add("bg-warning");
        document.getElementById("player2Name").classList.remove("bg-warning");
    } else {
        document.getElementById("player2Name").classList.add("bg-warning");
        document.getElementById("player1Name").classList.remove("bg-warning");
    }

}

function displayScore() {
    let player1Score = document.getElementById("player1Score");
    let player2Score = document.getElementById("player2Score");
    player1Score.innerText = game.players["1"].score;
    player2Score.innerText = game.players["2"].score;
}

function displayWinner(name) {
    let winnerDiv = document.getElementById("winner");
    let winnerSpan = document.getElementById("winnerName");
    let refresh = document.getElementById("refresh");
    winnerSpan.innerText = name;
    winnerDiv.classList.remove("hidden");
    refresh.classList.remove("hidden");
}

function playAgain() {
    location.reload();
}




window.addEventListener("load", function() {
    document.querySelector("#roll").addEventListener("click", handleDiceRoll);
    document.querySelector("form").addEventListener("submit", startGame);
    document.getElementById("hold").addEventListener("click", calculateScore);
    document.querySelector("#refresh").addEventListener("click", playAgain);
});



