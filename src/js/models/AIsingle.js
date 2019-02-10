export var ai = function aiBot(gameInstance, pew) {
    console.log('AI Single JS is firing');
    //Begin AI Calculation for best placement
    let priorityCalc = 0;
    let aiBoard = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
    ];
    let position = [0,0];
    //1) Find open spaces and calculate priority by updating array
        //Generate aiBoard from gameBoard array
        function genAIBoard () {
            gameInstance.gameBoard.forEach(function(el, row){
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
        
    //2) Check for possible win/loss
    function winloss () {  
        

        //a) If there are 2 possible wins/losses, randomly place (unless it can line up 2 in a row)
    }



    //3) Check to see if the center is open

    //4) Check to see if a corner is open

        //a) Priority: Place across from opponent

        //b) Calculate highest value open space

    // test returns
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (aiBoard[i][j] == 0)
                position = [ i, j];

    return position;
}

