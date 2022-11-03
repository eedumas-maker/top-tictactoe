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
        let win = false;
        let tie = false;
        let winner = '';

        let grid = board.getGrid(); // just grab it once for the method

        // iterate through edges
        console.log("checking for win");

        // try next making a checkRow and checkCol function

        // you pass it the row or col, and it returns true if the whole column
        // then you can run the checkRow in a for loop, and have it pass up till length-1
        // could even make a checkDiag function eh? no needed loop for that one

        const checkRow = (grid,row) => {
            let temp = grid[row][0];

            if(temp === ""){
                return ""; // escape out if first item is blank;
            }

            for(i = 0; i < (grid.length - 1); i++){
                
                if(temp === grid[row][i+1]){ // is it equal to the next one ?

                    if(i === (grid.length - 1)){ // win condition at last space
                        return temp; // elegant, as this is the winner!
                    }
                    temp = grid[row][i+1];
                    continue;
                }
                else{

                    return ""; //returns false if no match
                }
            }
        }

        const checkCol = (grid,col) => {
            let temp = grid[0][col];

            if(temp === ""){
                return ""; // escape out if first item is blank;
            }

            for(i = 0; i < (grid.length - 1); i++){
                
                if(temp === grid[i+1][col]){ // is it equal to the next one ?

                    if(i === (grid.length - 1)){ // win condition at last space
                        return temp; // elegant, as this is the winner!
                    }
                    temp = grid[i+1][col];
                    continue;
                }

                else{
                    return ""; //returns false if no match
                }
            }
        }

        const checkDiag = (grid) => {
            // write this laster (later/last)
        }

        for(i = 0; i < grid.length; i++){
            if(checkRow(grid,i)){
                win = true;
                let winner = checkRow(grid,i);/// hmm, this is tricky, can't check col or row each time
            }
            if(checkCol(grid,i)){
                win = true;
                let winner = checkCol(grid,i);
            }
        }
    
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

