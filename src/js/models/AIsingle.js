export var ai = function aiBot(gameInstance) {

    let position = [0,0];
    let continueSearch = true;
    let aiBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    
    // 1) Find open spaces and calculate priority by updating array
        // Generate aiBoard from gameBoard array
        function genAIBoard () {
            gameInstance.gameBoard.forEach(function(el, row) {
                for (let col = 0; col < el.length; col++) {
                    if (el[col] === "X") {
                        aiBoard[row][col] = -1;
                    } else if (el[col] === "O") {
                        aiBoard[row][col] = 1;
                    } 
                    else {
                        aiBoard[row][col] = 0;
                    } 
                 }
            })
            console.log(aiBoard);
        }
        genAIBoard();
        
    // 2) Check for possible win/loss
    for (var i = 0; i < 3; i++) {
        // rows
        if ( aiBoard[i][0] + aiBoard[i][1] + aiBoard[i][2] === 2 ) {
            position = [i, aiBoard[i].findIndex(value => value === 0)];
            continueSearch = false;
            break;
        } else if ( aiBoard[i][0] + aiBoard[i][1] + aiBoard[i][2] === -2) {
            position = [i, aiBoard[i].findIndex(value => value === 0)];
            continueSearch = false;
            break;
        }
        // columns
        if ( aiBoard[0][i] + aiBoard[1][i] + aiBoard[2][i] === 2) {
            for (var j = 0; j < 3 ; j++)
                if (aiBoard[j][i] === 0) { position = [j, i]; }
            continueSearch = false;
            break;
        } else if ( aiBoard[0][i] + aiBoard[1][i] + aiBoard[2][i] === -2 ) {
            for (var j = 0; j < 3 ; j++)
                if (aiBoard[j][i] === 0) { position = [j, i]; }
            continueSearch = false;
            break;
        }
    }

    // diagonals
    if ( aiBoard[0][0] + aiBoard[1][1] + aiBoard[2][2] === 2) {
        for (var i = 0; i < 3; i++)
            if ( aiBoard[i][i] === 0) { position = [i, i]; break;}
        continueSearch = false;        
    } else if ( aiBoard[0][0] + aiBoard[1][1] + aiBoard[2][2] === -2) {
        for (var i = 0; i < 3; i++)
            if ( aiBoard[i][i] === 0) { position = [i, i]; break;}
        continueSearch = false;        
    }
    if ( aiBoard[0][2] + aiBoard[1][1] + aiBoard[2][0] === 2) {
        if ( aiBoard[0][2] === 0 ) { position = [0, 2]; }
        else if ( aiBoard[1][1] === 0 ) { position = [1, 1]; }
        else { position = [2, 0]; }
        continueSearch = false;
    } else if ( aiBoard[0][2] + aiBoard[1][1] + aiBoard[2][0] === -2) {
        if ( aiBoard[0][2] === 0 ) { position = [0, 2]; }
        else if ( aiBoard[1][1] === 0 ) { position = [1, 1]; }
        else { position = [2, 0]; }
        continueSearch = false;
    }

        // a) If there are 2 possible wins/losses, randomly place (unless it can line up 2 in a row) (This is not needed anymore. - Wilson)

    // 3) Check to see if the center is open
    if ( continueSearch ) {
        if ( aiBoard[1][1] === 0 ) { 
            position = [1, 1]; 
            continueSearch = false; 
        } 
    }

    // 4) Check to see if a corner is open
    if ( continueSearch ) {
        if ( aiBoard[0][0] === 0) { return [0, 0]; }
        if ( aiBoard[0][2] === 0) { return [0, 2]; }
        if ( aiBoard[2][0] === 0) { return [2, 0]; }
        if ( aiBoard[2][2] === 0) { return [2, 2]; }
    }
        //a) Priority: Place across from opponent

        //b) Calculate highest value open space

    return position;
}

