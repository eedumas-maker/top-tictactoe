// gameboard object (module)

const board = (() => {
    let grid = [    // private
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];          // for an array that looks like this
                // 0,0  0,1  0,2
                // 1,0  1,1, 1,2
                // 2,0  2,1, 2,2
                // up and down is just first array position
                // left and right is second position
                // diagonal is +1+1 or -1-1
                

    const showGrid = () => { // private
        return grid;
    }

    const placeMark = (player,x,y) => {
        let mark = "";
        if (player == 1){
            let mark = "X";
        }
        else{
            let mark = "O";
        }

        grid[x[y]] = mark;
        return showGrid();
    }

    const resetGrid = () => {
        grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
        return showGrid();
    }

    return {
        placeMark,
        resetGrid
    }
    
})(); // iife, immediately invoked function expression


// player object (factory)

// game display object (module)

// later - AI

