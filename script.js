// gameboard object (module)

const board = (() => {
    let grid = [    // private
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];          // for an array that looks like this grid[0[0]]
                // 0,0  0,1  0,2
                // 1,0  1,1, 1,2
                // 2,0  2,1, 2,2
                // up and down is just first array position
                // left and right is second position
                // diagonal is +1+1 or -1-1
                

    const getGrid = () => { // private
        return grid;
    };

    const placeMark = (player,x,y) => {
        let mark = "";

        if (player == 1){
            mark = "X";
        }
        else{
            mark = "O";
        }

        grid[x][y] = mark; // set array mark

        game.switchPlayer(); // set next player

        game.incrementTurn(); // make it next turn
        
        game.checkForWin();

        return getGrid(); // pass the updated grid
    };

    const getMark = (x,y) => {
        return grid[x][y];
    }

    const resetGrid = () => {
        return grid = [ 
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
        ];
    };

    return {
        placeMark,
        getMark,
        resetGrid,
        getGrid
    };
    
})(); // IIFE, immediately invoked function expression


// game display object (module)
const game = (() => {
    let turn = 0;
    let startPlayer = 0; //utilize later
    let activePlayer = 1;

    let grid = board.getGrid();

    document.addEventListener('click', function (event) {

        if (event.target.matches('.cell')){ // will need to be more specific if i add other buttons
            button = event.target;
            let x = button.id.substring(0,1);
            let y = button.id.substring(2,3);
            
            board.placeMark(activePlayer,x,y);
            button.innerHTML = board.getMark(x,y);
            button.disabled = true; 
        };

    }, false);

    const switchPlayer = () => {
        if (activePlayer == 1){
            activePlayer = 2;
        }
        else{
            activePlayer = 1;
        }
    }

    const newGame = () => {
        board.resetGrid(); //resets the array but doesn't remove the HTML from the buttons
        turn = 0;
        activePlayer = 0;
        resetButtons();
    };

    const resetButtons = () => { // this isn't working, but i should commit it
        let temp = document.querySelectorAll('.cell');
        for (cell in temp){
            cell.innerHTML = '';
        };
    };


    const incrementTurn = () => {
        turn++;
        return turn;
    };

    const checkForWin = () => {
        let boardSize = 3; // so I can futz with this later and make bigger boards!
        let winMark = '';

        // i wish i knew recursion
        // only need to check neighbors from edge on out, WILL NEED TO REFACTOR FOR LARGER BOARD!
        for(x = 0; x < boardSize; x++){
            
            if (board.getMark(x,0) === board.getMark(x,1) && // if 00 = 01 = 02 (x axis)
                board.getMark(x,1) === board.getMark(x,2)){
                    winMark = board.getMark(x,0);
                }
            else if(board.getMark(0,x) === board.getMark(1,x) && // if 00 = 10 = 20 (y axis)
                board.getMark(1,x) === board.getMark(2,x) ){
                    winMark = board.getMark(0,x);
                }
        };

        if(board.getMark(0,0) === board.getMark(1,1) && // diagonal one (hardcoded, i know, gross)
            board.getMark(1,1) === board.getMark(2,2)) {
                winMark = board.getMark(0,0);
            }
        else if(board.getMark(0,2) === board.getMark(1,1) && // diagonal two (same, gross)
                board.getMark(1,1) === board.getMark(2,0)) {
                winMark = board.getMark(0,2);
            };

        
        if(winMark = '' && turn <9){
            return;
        }
        else if(winMark = '' && turn == 9){
            alert(`It's a Tie!`);
            return winMark = "Tie";
        }
        else if(winMark != ''){
            alert(`${winMark} is the Winner!`);
            return winMark;

        };

        console.log("the win mark is" + winMark);


    };

    const showGrid = () => { // this may be depreciated

         grid.forEach((value, row) => {
            
            value.forEach((item, column) => {
                console.log(item, row, column);
            })

        });
    };

    return {
        newGame,
        incrementTurn,
        checkForWin,
        resetButtons, // maybe keep private later, only needed in this module
        switchPlayer,
        showGrid
    };

})();

// player object (factory)
const newPlayer = (number) => {
    const getNumber = () => number;

    return {getNumber};

};


const player1 = newPlayer(1);
const player2 = newPlayer(2);

 




// later - AI

