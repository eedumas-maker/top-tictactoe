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

        if (player === 1){
            mark = "X";
        }
        else{
            mark = "O";
        }

        grid[x][y] = mark;
        
        

        game.playerUp(game.getActivePlayer());
        

        if(game.checkForWin(grid,x,y))
        {
            game.winReset();
            console.log("We have a winner, and it's " + mark);
        }
        else { // if no winners
            game.incrementTurn();
            game.switchPlayer(); // set next player
            game.checkForTie();
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
    let turn = 1;

    let activePlayer = 0;
   
    let player1Name = '';
    let player2Name = '';

    let grid = board.getGrid();

    const playerUp = () => {
        playerDisplay = document.querySelector(".playerUp");

        if(activePlayer === 1){
            return playerDisplay.innerHTML = `<h1>${player1Name} is up</h1>`;
        }
        else if(activePlayer === 2){
            return playerDisplay.innerHTML = `<h1>${player2Name} is up</h1>`;
        }
        else {
            return playerDisplay.innerHTML = `<h1>Please press New Game below</h1>`;
        }
    }

    const winReset = () => {
        winnerDisplay = document.querySelector(".playerUp");
        
        if(activePlayer === 1){
            winnerDisplay.innerHTML = `<h1>${player1Name} is the winner!</h1>`;
        }
        else{
            winnerDisplay.innerHTML = `<h1>${player2Name} is the winner!</h1>`;
        }
        
        freezeButtons();
    }

    const getActivePlayer = () => {
        return activePlayer;
    }

    const setPlayerName = (playerNum) => {
        if(playerNum === 1){
            player1Name = prompt("Player #1's name:");
        }
        else if (playerNum === 2){
            player2Name = prompt("Player #2's name:");
        }
        else {
            window.alert("Please only 2 players");
        }
    }


    const checkForWin = (grid,x,y) => {

        // look at each row and column that crosses the x,y, so if the target is 2,2 
        // then you'd check the row starting from 20, 21, 22 and the column from 02 12 22
        // meaning you only need to iterate through one side at a time

        console.log("It's " + board.getMark(x,y) + "'s turn");
        console.log("checking x/y at " + x + " and " + y);
        console.log("and the grid shows... " + grid[x][y]);
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

        const checkDiag1 = function(x,y){
            for(let i = 0; i < grid.length; i++){

                console.log(grid[i][i]);
                if(grid[x][y] !== grid[i][i]){
                    return false;
                }
            }
            return true;
        }

        const checkDiag2 = function(x,y){
            for(let i = 0; i < grid.length; i++){
                let temp = (grid.length -1) - i;
                if(grid[x][y] !== grid[i][temp]){

                    return false;
                }
            }
            return true; 
        }
        

        if(checkCol(y) || checkRow(x) || checkDiag1(x,y) || checkDiag2(x,y)){
            return true;
        }
    };

    const checkForTie = () => {
        if(turn < 10){
            return false;
        }
        else {
            let display = document.querySelector(".playerUp");
            display.innerHTML = `<h1>It's a tie</h1>`;
            freezeButtons();
            debugger;
        }
    }

    document.addEventListener('click', function (event) {

        if (event.target.matches('.cell')){ // will need to be more specific if i add other buttons
            button = event.target;
            let x = button.id.substring(0,1);
            let y = button.id.substring(2,3);
            
            board.placeMark(activePlayer,x,y);
            button.innerHTML = board.getMark(x,y);
            button.disabled = true; 
        };

        if (event.target.matches('.newGame')){
            button = event.target;
            newGame();
        }

    }, false);

    const switchPlayer = () => {
        if (activePlayer == 1){
            activePlayer = 2;
        }
        else{
            activePlayer = 1;
        }
        playerUp();
    }

    const newGame = () => {
        
        board.resetGrid(); //resets the array but doesn't remove the HTML from the buttons
        enableButtons();
        turn = 1;
        activePlayer = 1;
        resetButtons();

        setPlayerName(1);
        setPlayerName(2);

        playerUp();
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

    const enableButtons = () => {
        let elements = document.querySelectorAll('.cell');
        for(let i = 0; i < elements.length; i++){
            elements[i].disabled = false;
        }
    }


    const incrementTurn = () => {
        turn++;
        console.log("it's now turn# " + turn);
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
        winReset,
        checkForTie
    };

})();

// player object (factory)
const newPlayer = (number) => {
    const getNumber = () => number;

    return {getNumber};

};

// put all this behind a New Game button that asks players their names

game.newGame();
 




// later - AI

