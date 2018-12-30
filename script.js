//Data Controller


    let currPlayer;  //False is player 1, true is player 2
    let isPlaying = false;
    let round = 0;
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
        //Victory!
        for (var i = 0; i < 3; i++) {
            // check all rows
            if (gameBoard[i][0] === gameBoard[i][1] &&
                    gameBoard[i][0] === gameBoard[i][2]) {
                alert(`${currPlayer} has won! Thanks for playing.`);
            }
            // check all columns
            if (gameBoard[0][i] === gameBoard[1][i] &&
                    gameBoard[0][i] === gameBoard[2][i]) {
                alert(`${currPlayer} has won! Thanks for playing.`);
            }
            // check diagonally
            if (gameBoard[0][0] === gameBoard[1][1] &&
                    gameBoard[0][0] === gameBoard[2][2]) {
                alert(`${currPlayer} has won! Thanks for playing.`);
            }
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
        if (isPlaying) {
            
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
                console.log(itemID);
            }

        }

        checkWinCon();

    }
    
//Controller Module

    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.querySelector('.gameBoard').addEventListener('click', userInput);


    function startGame() {
        isPlaying = true;
        console.log('Start game clickeD!')
        //Start round counter in UI and Data
        

        //establish who is x and who is 0
        
        //Start current player function
        currPlayer = firstPlayer();
        
        //Display first player in UI
        displayCurrPlayer();
        
    }

    
