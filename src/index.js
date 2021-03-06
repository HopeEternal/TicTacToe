import './css/style.css'
import { Game } from './js/models/Main'; //Import Main Data Controller 'Game'
import { ai } from './js/models/AIsingle'; //Import AI from AISingle

let game = new Game();
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

            // Allows bot to go first
            if ( gameInstance.multiPlayer == "localSingle" && gameInstance.currPlayer)
                userInput(gameInstance);
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

var i = 0;
function displayCurrPlayer(gameInstance) {   
    
    //If it's Player 1's turn   
    if (!gameInstance.currPlayer) {
        document.querySelector('.player1').classList.add('activePlayer');
        document.querySelector('.player2').classList.remove('activePlayer');
        console.log(gameInstance.currPlayer + " in if " + i++);
    }
    //If it's Player 2's turn
    else {
        document.querySelector('.player1').classList.remove('activePlayer');
        document.querySelector('.player2').classList.add('activePlayer');
        console.log(gameInstance.currPlayer + " in else " + i++);
    }
}

function userInput( gameInstance ) {
    
    // Check to determine what type of game and number of players/bots
    if (gameInstance.multiPlayer === 'localSingle') {
        // Human
        if (gameInstance.currPlayer === false) {
            updateGameboard( event.target.id.split(""), gameInstance ); 
        } 
        // Bot
        else {
            updateGameboard( ai(gameInstance), gameInstance );
        }

    } else if (gameInstance.multiPlayer === 'localMulti') {
        updateGameboard( event.target.id.split(""), gameInstance );
    }

    if ( gameInstance.gameState ) {
        gameInstance.checkWinCon();
        displayCurrPlayer( gameInstance );
    }
}

// Update gameBoard graphics and check for wins
function updateGameboard ( position, gameInstance ) {
    var itemID = position.join('');
    
    // If game is running and there is an input
    if ( gameInstance.gameState && position[0] >= 0 && document.getElementById( itemID ).innerText == "") {

        // If Player 1 in a bot game
        if ( gameInstance.multiPlayer == "localSingle" && !gameInstance.currPlayer ) {

            var piece = 'X';
            document.getElementById( itemID ).innerText = piece;
            gameInstance.gameBoard[position[0]][position[1]] = piece;

            gameInstance.currPlayer = !gameInstance.currPlayer;
            gameInstance.checkWinCon();
            userInput( gameInstance );

        // If Player 1 in a multiplayer game
        } else if ( gameInstance.multiPlayer == "localMulti" && !gameInstance.currPlayer ) {

            var piece = 'X';
            document.getElementById( itemID ).innerText = piece;
            gameInstance.gameBoard[position[0]][position[1]] = piece;
            gameInstance.currPlayer = !gameInstance.currPlayer;

        // If Player 2 OR Bot
        } else {
            
            var piece = 'O';
            
            function oPlayerMove() {
                document.getElementById(itemID).innerText = piece;
                gameInstance.gameBoard[position[0]][position[1]] = piece;
                gameInstance.currPlayer = !gameInstance.currPlayer;
            }
            
            // If Bot
            if(gameInstance.multiPlayer == "localSingle") {
                setTimeout(function(){ 
                    oPlayerMove();
                    console.log("Hmm...")
                }, 1000); 
                // Trigger a click manually to invoke userInput function (Doesn't work)
                // document.querySelector('.gameBoard').click();
            }
            // If Player 2 in Multiplayer
            else {
                oPlayerMove();
            }
        }
    }
}

function startModal() {
    console.log('Start Modal');
}

function hideModal(gameInstance) {
    console.log('Hide Modal');
    
        
        //Set Form Values to Variables
        gameInstance.p1Name = document.getElementById('player1Input').value;
        gameInstance.p2Name = document.getElementById('player2Input').value;
        gameInstance.points2Win = parseInt(document.getElementById('points2Win').value);
    
        //Add catch to ensure all fields filled out before starting the game
    if (singleRadio.checked && (gameInstance.p1Name === "" || gameInstance.points2Win === "")) {
            document.getElementById('requiredWarning').innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please complete all form fields!';
        }
    else if (multiRadio.checked && (gameInstance.p1Name === "" || gameInstance.p2Name === "" || gameInstance.points2Win === "")) {
            document.getElementById('requiredWarning').innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please complete all form fields!';
        }
    else {
        //Hide Modal
        document.getElementById('modalStartBtn').parentNode.parentNode.parentNode.classList.add('hidden');
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
}
