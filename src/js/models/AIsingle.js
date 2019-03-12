export var ai = function aiBot(gameInstance) {

    let aiBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // 1) Generate aiBoard from gameBoard array
    gameInstance.gameBoard.forEach(function(el, row) {

        for (let col = 0; col < el.length; col++) {

            if      (el[col] === "X") { aiBoard[row][col] = -1; } 
            else if (el[col] === "O") { aiBoard[row][col] =  1; } 
            else                      { aiBoard[row][col] =  0; } 
        }
    });

    // 2) Check for possible win/loss
    for (var i = 0; i < 3; i++) {

        // rows
        if ( aiBoard[i][0] + aiBoard[i][1] + aiBoard[i][2] === 2 ) {

            return [i, aiBoard[i].findIndex(value => value === 0)];

        } else if ( aiBoard[i][0] + aiBoard[i][1] + aiBoard[i][2] === -2) {
            
            return [i, aiBoard[i].findIndex(value => value === 0)];
        }
        // columns
        if ( aiBoard[0][i] + aiBoard[1][i] + aiBoard[2][i] === 2) {

            for (var j = 0; j < 3 ; j++)
                if (aiBoard[j][i] === 0) { return [j, i]; }

        } else if ( aiBoard[0][i] + aiBoard[1][i] + aiBoard[2][i] === -2 ) {

            for (var j = 0; j < 3 ; j++)
                if (aiBoard[j][i] === 0) { return [j, i]; }
        }
    }

    // diagonal checks
    if ( aiBoard[0][0] + aiBoard[1][1] + aiBoard[2][2] === 2) {

        for (var i = 0; i < 3; i++) 
            if ( aiBoard[i][i] === 0) { return [i, i]; } 

    } else if ( aiBoard[0][0] + aiBoard[1][1] + aiBoard[2][2] === -2) {

        for (var i = 0; i < 3; i++) 
            if ( aiBoard[i][i] === 0) { return [i, i]; }
    }

    if ( aiBoard[0][2] + aiBoard[1][1] + aiBoard[2][0] === 2) {

        if      ( aiBoard[0][2] === 0 ) { return [0, 2]; }
        else if ( aiBoard[1][1] === 0 ) { return [1, 1]; }
        else                            { return [2, 0]; }

    } else if ( aiBoard[0][2] + aiBoard[1][1] + aiBoard[2][0] === -2) {

        if      ( aiBoard[0][2] === 0 ) { return [0, 2]; }
        else if ( aiBoard[1][1] === 0 ) { return [1, 1]; }
        else                            { return [2, 0]; }
    }

    // 3) Check to see if the center is open
    // 4) Check to see if a corner is open
        // a) Priority: Place across from opponent
        // b) Calculate highest value open space
        
    if ( aiBoard[1][1] === 0 ) { return [1, 1]; } 
    if ( aiBoard[0][0] === 0 ) { return [0, 0]; }
    if ( aiBoard[0][2] === 0 ) { return [0, 2]; }
    if ( aiBoard[2][0] === 0 ) { return [2, 0]; }
    if ( aiBoard[2][2] === 0 ) { return [2, 2]; }

    if ( aiBoard[0][1] === 0 ) { return [0, 1]; }
    if ( aiBoard[1][0] === 0 ) { return [1, 0]; }
    if ( aiBoard[1][2] === 0 ) { return [1, 2]; }
    if ( aiBoard[2][1] === 0 ) { return [2, 1]; }

    return [-1, -1];
}

