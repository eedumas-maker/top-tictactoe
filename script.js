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

        
        
        game.playerUp(game.getActivePlayer());
        
        if(game.checkForWin(x, y))
        {
            game.winReset();
            console.log("We have a winner, and it's " + mark);
        }
        else { // if no winners
            game.switchPlayer(); // set next player
            game.incrementTurn(); // make it next turn
        } 

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
    let boardSize = 3; // so I can futz with this later and make bigger boards!
    let win = false;
    let tie = false;
    let winner = '';

    let grid = board.getGrid();

    const playerUp = () => {
        playerDisplay = document.querySelector(".playerUp");

        if(activePlayer === 1){
            return playerDisplay.innerHTML = "<h1>Player 1 is up</h1>"
        }
        else if(activePlayer === 2){
            return playerDisplay.innerHTML = "<h1>Player 2 is up</h1>"
        }
    }

    const winReset = () => {
        winnerDisplay = document.querySelector(".winner");
        winnerDisplay.innerHTML = `<h3>Player #${activePlayer} is the winner!</h3>`;
        freezeButtons();
    }

    const getActivePlayer = () => {
        return activePlayer;
    }

    const checkForWin = (x,y) => {

        // look at each row and column that crosses the x,y, so if the target is 2,2 
        // then you'd check the row starting from 20, 21, 22 and the column from 02 12 22
        // meaning you only need to iterate through one side at a time

        console.log("It's " + grid[x][y] + "'s turn");
        console.log("checking x/y at " + x + " and " + y);


        // of course it returns false, there's no way it's true along all axis
        // put into their own IIFEs ok?

        const checkCol = function(y){
            for(let i = 0; i< grid.length -1; i++){
                if(grid[i][y] !== grid[i+1][y]){
                    return false;
                }
            }
            return true;
        };
        
        const checkRow = function(x){
            for(let i = 0; i< grid.length -1; i++){
                if(grid[x][i] !== grid[x][i+1]){
                return false;
                }
            }
            return true;
        };

        if(checkCol(y) || checkRow(x)){
            return true;
        }
    };

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
        let elements = document.querySelectorAll('.cell');
        for(let i = 0; i < elements.length; i++){
            elements[i].innerHTML = "";
        }
    };

    const freezeButtons = () => {
        let elements = document.querySelectorAll('.cell');
        for(let i = 0; i < elements.length; i++){
            elements[i].disabled = true;
        }
    }


    const incrementTurn = () => {
        turn++;
        return turn;
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
        showGrid, 
        playerUp,
        getActivePlayer,
        freezeButtons,
        winReset
    };

})();

// player object (factory)
const newPlayer = (number) => {
    const getNumber = () => number;

    return {getNumber};

};


const player1 = newPlayer(1);
const player2 = newPlayer(2);
game.playerUp();
 




// later - AI

