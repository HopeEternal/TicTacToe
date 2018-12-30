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
        if (gameBoard[0][1] === 'X' && gameBoard[1] === 'X' && gameBoard[2] === 'X') {
            alert(`${currPlayer} has won! Thanks for playing.`);
        }
        // if (gameBoard[0][0] === 'X') {
        //     alert(`${currPlayer} has won! Thanks for playing.`);
        //     isPlaying = false;
        // }
        // //Keep playing
        // else {

        // }
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
        if (isPlaying) {
            
            if (document.getElementById(itemID).innerText == "") {
                
                if (!currPlayer) {
                    var piece = 'X';
                    document.getElementById(itemID).innerText = piece;
                    gameBoard[itemID] = piece;
                }
                else {
                    var piece = 'O';
                    document.getElementById(itemID).innerText = piece;
                    gameBoard[itemID] = piece;
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

    
