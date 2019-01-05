

//Data Controller
    let gameState;
    let currPlayer;  //False is player 1, true is player 2
    let round = 0;
    let player1Score = 0;
    let player2Score = 0;
    let p1Name = "Player 1";
    let p2Name = "Player 2";
    let points2Win = 0;
    let gameBoard = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
    ];

    //Randomly decide first player
    function firstPlayer() {
        return Math.random() >= 0.5;
    }

    //Check to see if there is a winner
    function checkWinCon() {
        function victoryAlert() {
            setTimeout(function(){
                if (currPlayer) {
                    player2Score++;
                    document.getElementById("p2Score").innerText = player2Score;
                    alert(`Player 2 (X) has won! Thanks for playing.`);
                }
                else {
                    player1Score++;
                    document.getElementById("p1Score").innerText = player1Score;
                    alert(`Player 1 (O) has won! Thanks for playing.`);
                }
            }, 100);
        }

        //Victory!
        for (var i = 0; i < 3; i++) {
            // check all rows
            if (gameBoard[i][0] === gameBoard[i][1] &&
                    gameBoard[i][0] === gameBoard[i][2]) {
                victoryAlert();
                isPlaying(false);
            }
            // check all columns
            if (gameBoard[0][i] === gameBoard[1][i] &&
                    gameBoard[0][i] === gameBoard[2][i]) {
                victoryAlert();
                isPlaying(false);
            }
        }
        // check diagonally 
        if (gameBoard[0][0] === gameBoard[1][1] &&
                gameBoard[0][0] === gameBoard[2][2]) {
            victoryAlert();
            isPlaying(false);
        } else if (gameBoard[0][2] === gameBoard[1][1] &&
                gameBoard[0][2] === gameBoard[2][0]) {
            victoryAlert();
            isPlaying(false);
        }
        // Detect Draw and no winners
        else {
            let draw = 0;
            for (var i = 0; i < 3; i++) {
                gameBoard[i].forEach(function(cur) {
                    if (cur === 'X' || cur === 'O') {
                        draw++;
                    }
                });
                if (draw === 9) {
                    setTimeout(function(){
                        alert(`It's a draw! Thanks for playing.`);
                    }, 100);
                    isPlaying(false);
                }
            }
        }

    }

    //isPlaying Game State Definitions
    function isPlaying(state) {
        if (state) {
            //Enter what to do if the Game is Playing
            console.log('Game is Playing');
            let grid = document.querySelectorAll('.gridSquare');        
            console.log(grid);
            grid.forEach(cur => cur.classList.add('hvr-rectangle-out'));
            gameState = true;
        }
        else {
            //Enter what to do if the Game is not Playing
            console.log('Game is Not Playing');            

            gameState = false;
        }

    }


//UI Controller

    function displayCurrPlayer() {
        if (!currPlayer) {
            document.querySelector('.player1').classList.add('activePlayer');
            document.querySelector('.player2').classList.remove('activePlayer');
        }
        else {
            document.querySelector('.player1').classList.remove('activePlayer');
            document.querySelector('.player2').classList.add('activePlayer');
        }
    }

    function userInput() {
        let itemID = event.target.id;
        let position = itemID.split("");
        if (gameState) {
            
            if (document.getElementById(itemID).innerText == "") {
                
                if (!currPlayer) {
                    var piece = 'X';
                    document.getElementById(itemID).innerText = piece;
                    gameBoard[position[0]][position[1]] = piece;
                }
                else {
                    var piece = 'O';
                    document.getElementById(itemID).innerText = piece;
                    gameBoard[position[0]][position[1]] = piece;
                }
                currPlayer = !currPlayer;
            }
            checkWinCon();
            displayCurrPlayer();
        }        
    }

    function startModal() {
        console.log('Start Modal');
        
    }

    function hideModal() {
        console.log('Hide Modal');
        document.getElementById('modalStartBtn').parentNode.parentNode.parentNode.classList.add('hidden');
        p1Name = document.getElementById('player1Input').value;
        p2Name = document.getElementById('player2Input').value;
        points2Win = document.getElementById('player2Input').value;

        document.getElementById('player1Name').innerText = p1Name;
        document.getElementById('player2Name').innerText = p2Name;
        document.getElementById('scrPlayer1Name').innerText = p1Name;
        document.getElementById('scrPlayer2Name').innerText = p2Name;

    }

    
//Controller Module

    function setupEventListeners() {
        document.getElementById('startGameBtn').addEventListener('click', startGame);
        document.querySelector('.gameBoard').addEventListener('click', userInput);
        document.getElementById('modalStartBtn').addEventListener('click', hideModal);
    }


    function startGame() {
        gameState = true;
        isPlaying(true);
        console.log('Start game clickeD!')
        //Reset gameBoard
        gameBoard = [
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
        round++;
        document.getElementById('currRound').innerText = round;

        //establish who is x and who is 0
        
        //Start current player function
        currPlayer = firstPlayer();
        
        //Display first player in UI
        displayCurrPlayer();
        
    }

    function init() {
        console.log('Application has started.');
        gameState=false;
        isPlaying(false);
        setupEventListeners();
        startModal();
    }
    
    init();
