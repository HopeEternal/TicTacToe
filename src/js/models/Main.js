//Data Controller

export class Game {

    //Possible Args: gameState, currPlayer, round, player1Score, player2Score, p1Name, p2Name, points2Win, gameWon, gameBoard
    constructor() {
        this.gameState = false;
        this.currPlayer = false;  //False is player 1, true is player 2
        this.round = 0;
        this.player1Score = 0;
        this.player2Score = 0;
        this.p1Name = "Player 1";
        this.p2Name = "Player 2";
        this.points2Win = 0;
        this.multiPlayer; //String with 3 options: localSingle, localMulti, onlineMulti
        this.gameWon = false;
        this.gameBoard = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
        ]
    }
    //Randomly decide first player
    firstPlayer() {
        return Math.random() >= 0.5;
    }

    //Check to see if there is a winner
    checkWinCon() {
        let that = this;
        function victoryAlert() {
            setTimeout(function(){
                if (!that.currPlayer) {
                    that.player2Score++;
                    document.getElementById("p2Score").innerText = that.player2Score;
                    alert(`${that.p2Name} has won the round!`);
                }
                else {
                    that.player1Score++;
                    document.getElementById("p1Score").innerText = that.player1Score;
                    alert(`${that.p1Name} has won the round!`);
                }
            }, 100);
        }

        //Victory!
        for (var i = 0; i < 3; i++) {
            // check all rows
            if (this.gameBoard[i][0] === this.gameBoard[i][1] &&
                    this.gameBoard[i][0] === this.gameBoard[i][2]) {
                victoryAlert();
                this.isPlaying(false);
            }
            // check all columns
            if (this.gameBoard[0][i] === this.gameBoard[1][i] &&
                    this.gameBoard[0][i] === this.gameBoard[2][i]) {
                victoryAlert();
                this.isPlaying(false);
            }
        }
        // check diagonally 
        if (this.gameBoard[0][0] === this.gameBoard[1][1] &&
                this.gameBoard[0][0] === this.gameBoard[2][2]) {
            victoryAlert();
            this.isPlaying(false);
        } else if (this.gameBoard[0][2] === this.gameBoard[1][1] &&
                this.gameBoard[0][2] === this.gameBoard[2][0]) {
            victoryAlert();
            this.isPlaying(false);
        }
        // Detect Draw and no winners
        else {
            let draw = 0;
            for (var i = 0; i < 3; i++) {
                this.gameBoard[i].forEach(function(cur) {
                    if (cur === 'X' || cur === 'O') {
                        draw++;
                    }
                });
                if (draw === 9) {
                    setTimeout(function(){
                        alert(`It's a draw! Thanks for playing.`);
                    }, 100);
                    this.isPlaying(false);
                }
            }
        }
        // check for game winner
        setTimeout(function(){
            console.log(that.player2Score);
            if (that.player1Score == that.points2Win) {
                alert(`${that.p1Name} has won the game! Thanks for playing.`);
                that.gameWon = true;
                that.isPlaying(false);
            } else if (that.player2Score == that.points2Win) {
                alert(`${that.p2Name} has won the game! Thanks for playing.`);
                that.gameWon = true;
                that.isPlaying(false);
            }
        }, 500);
    }

    //isPlaying Game State Definitions
    isPlaying(state) {
        if (state) {
            //Enter what to do if the Game is Playing
            console.log('Game is Playing');
            let grid = document.querySelectorAll('.gridSquare');       
            grid.forEach(cur => cur.classList.add('hvr-rectangle-out'));
            this.gameState = true;
        }
        else {
            //Enter what to do if the Game is not Playing
            console.log('Game is Not Playing');            
            this.gameState = false;
        }
    }
}