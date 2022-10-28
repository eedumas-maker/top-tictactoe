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

        grid[x][y] = mark;
        display.switchPlayer();

        return getGrid();
    };

    const getMark = (x,y) => {
        return grid[x][y];
    }

    const resetGrid = () => {
        grid = [ 
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
        return getGrid();
    };

    return {
        placeMark,
        getMark,
        resetGrid,
        getGrid
    };
    
})(); // IIFE, immediately invoked function expression


// game display object (module)
const display = (() => {
    let turn = 0;
    let startPlayer = 0;
    let activePlayer = 1;

    let grid = board.getGrid();

    // process buttons and add listeners
    const allButtons = document.querySelectorAll("button");
    
    document.addEventListener('click', function (event) {

        if (event.target.matches('button')){
            button = event.target;
            let x = button.id.substring(0,1);
            let y = button.id.substring(2,3);
            
            board.placeMark(activePlayer,x,y);
            button.innerHTML = board.getMark(x,y);
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
        board.resetGrid();
    };

    const checkForWin = () => {

    };

    const showGrid = () => {

         grid.forEach((value, row) => {
            
            value.forEach((item, column) => {
                console.log(item, row, column);

            })

        });

        // iterate through the grid array
        // for every x,y set the same button with ID x,y to have the same innerhtml value
        // grab all those buttons first

    
    };

    return {
        newGame,
        checkForWin,
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

