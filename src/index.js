import './css/style.css'
//Import Main Data Controller 'Game'
import { Game } from './js/models/Main';
let game = new Game();
console.log(game);

//Import AI from AISingle
import { ai } from './js/models/AIsingle';

//Requires
//var pg = require('pg');

//A localhost PostgreSQL database connection string
//var connectionString = "postgres://datafetch:fetchscores4u@localhost/tictactoescoreboard";




//Controller Module

    function setupEventListeners(gameInstance) {
        document.getElementById('startGameBtn').addEventListener('click', function(){startGame(gameInstance)});
        document.querySelector('.gameBoard').addEventListener('click', function(){userInput(gameInstance)});
        document.getElementById('modalStartBtn').addEventListener('click', function(){hideModal(gameInstance)});
        document.getElementById('singleRadio').addEventListener('click', multiPlayerSettings);
        document.getElementById('multiRadio').addEventListener('click', multiPlayerSettings);
    }

    function startGame(gameInstance) {
        if (!gameInstance.gameState && !gameInstance.gameWon) {
            gameInstance.gameState = true;
            
            gameInstance.isPlaying(true);
            console.log('Start game clicked!')
            //Reset gameBoard
            gameInstance.gameBoard = [
                ['a', 'b', 'c'],
                ['d', 'e', 'f'],
                ['g', 'h', 'i']
            ];
            for (var row = 0; row < 3; row++) {
                for (var column = 0; column < 3; column++) {
                    document.getElementById("" + row + column).innerText = '';
                }
            }

            //Start round counter in UI and Data
            gameInstance.round++;
            document.getElementById('currRound').innerText = gameInstance.round;

            //establish who is x and who is 0
            
            //Start current player function
            gameInstance.currPlayer = gameInstance.firstPlayer();
            
            //Display first player in UI
            displayCurrPlayer(gameInstance);
        }
    }

    function init(gameInstance) {
        console.log('Application has started.');
        gameInstance.gameState=false;
        gameInstance.isPlaying(false);
        setupEventListeners(gameInstance);
        startModal();
    }
    
    init(game);


// UI Controller


function displayCurrPlayer(gameInstance) {
    if (!gameInstance.currPlayer) {
        document.querySelector('.player1').classList.add('activePlayer');
        document.querySelector('.player2').classList.remove('activePlayer');
    }
    else {
        document.querySelector('.player1').classList.remove('activePlayer');
        document.querySelector('.player2').classList.add('activePlayer');
    }
}

function userInput(gameInstance) {
    let itemID;
    let position;
    //Human and AI Input for Local games
    function updateGameboard(position) {
        if (gameInstance.gameState) {
            if (document.getElementById(itemID).innerText == "") {
                
                if (!gameInstance.currPlayer) {
                    var piece = 'X';
                    document.getElementById(itemID).innerText = piece;
                    gameInstance.gameBoard[position[0]][position[1]] = piece;
                }
                else {
                    var piece = 'O';
                    document.getElementById(itemID).innerText = piece;
                    gameInstance.gameBoard[position[0]][position[1]] = piece;
                }
                gameInstance.currPlayer = !gameInstance.currPlayer;
            }
            gameInstance.checkWinCon();
            displayCurrPlayer(gameInstance);
        }
    } 
    //Check to determine what type of game and number of players/bots
    if (gameInstance.multiPlayer === 'localSingle') {
        //Human
        if (gameInstance.currPlayer === false) {
            itemID = event.target.id;
            position = itemID.split("");
            updateGameboard(position);
        } 
        //Bot
        else {
            position = ai(gameInstance);
            //itemID = position.join('');
            updateGameboard(position);
        }

    } else if (gameInstance.multiPlayer === 'localMulti') {
        itemID = event.target.id;
        position = itemID.split("");
        updateGameboard(position);
    }
}

function startModal() {
    console.log('Start Modal');
}

function hideModal(gameInstance) {
    console.log('Hide Modal');
    document.getElementById('modalStartBtn').parentNode.parentNode.parentNode.classList.add('hidden');
    gameInstance.p1Name = document.getElementById('player1Input').value;
    gameInstance.p2Name = document.getElementById('player2Input').value;
    gameInstance.points2Win = parseInt(document.getElementById('points2Win').value);
    
    //Show Player Names based on Single or Multi
    if (singleRadio.checked) {
        document.getElementById('player1Name').innerText = gameInstance.p1Name;
        document.getElementById('player2Name').innerText = "Player 2 Bot";
        document.getElementById('scrPlayer1Name').innerText = gameInstance.p1Name;
        document.getElementById('scrPlayer2Name').innerText = "Player 2 Bot";
        //Set game type to local single player
        gameInstance.multiPlayer = 'localSingle';
    }
    else if (multiRadio.checked) {
        document.getElementById('player1Name').innerText = gameInstance.p1Name;
        document.getElementById('player2Name').innerText = gameInstance.p2Name;
        document.getElementById('scrPlayer1Name').innerText = gameInstance.p1Name;
        document.getElementById('scrPlayer2Name').innerText = gameInstance.p2Name;
        //Set game type to local multi player
        gameInstance.multiPlayer = 'localMulti';
    }
    startGame(gameInstance);
}

function multiPlayerSettings() {
    if (singleRadio.checked) {
        console.log('Single is checked');
        document.getElementById('p2Cont').style.display = "none";
    }
    else if (multiRadio.checked) {
        console.log('Multi selected');
        document.getElementById('p2Cont').style.display = "block";
    }
    console.log('Triggered Player settings');
}
