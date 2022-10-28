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
                

    const showGrid = () => { // private
        return grid;
    };

    const placeMark = (player,x,y) => {
        let mark = "";

        if (player === 1){
            mark = "X";
        }
        else{
            mark = "O";
        }

        grid[x][y] = mark;
        return showGrid();
    };

    const resetGrid = () => {
        grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
        return showGrid();
    };

    return {
        placeMark,
        resetGrid,
        showGrid
    };
    
})(); // iife, immediately invoked function expression

// game display object (module)
const gameDisplay = (() => {
    let turn = 0;
    let startPlayer = 0;
    let grid = board.showGrid();

    const newGame = () => {
        board.resetGrid();
    };

    const checkForWin = () => {

    };

    const displayGrid = () => {

        const allButtons = document.querySelectorAll("button");

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
        displayGrid
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

