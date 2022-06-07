const disp = document.querySelector('.display');
const head = document.createElement('div');




const player = (name, symbol) => {
    const sayHello = () => console.log('hello');
    const updateName = (newName) => {
        name = newName;
    }
    const getName = () => {
        return name;
    }
    const getSymbol = () =>  {
        return symbol;
    }
    return { updateName, getName, getSymbol, sayHello };
};




const gameBoard = (() => {
    let board = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    let players = [player('player1', 'X'), player('player2', 'O')];
    let moves = 0;
    let done = false;
    // console.log(players);
    let curPlayer = 0;
    const addPlayer = (name, symbol) => {
        if(symbol === 'X'){
            players[0].updateName(name);
        }
        else{
            players[1].updateName(name);
        }
        updateDisplay();
    };
    const getPlayer = (id) => {
        return players[id].getName();
    };
    
    const updateDisplay = (ele) => {
        let header = document.querySelector('.header');
        if(header == null){
            header = document.createElement('div');
            header.className = 'header';
        }
   
        let p1 = document.createElement('h1');
        p1.innerHTML = players[0].getName() + ' "' + players[0].getSymbol() + '"';
        header.appendChild(p1);
        let p2 = document.createElement('h1')
        p2.innerHTML = players[1].getName() + ' "' + players[1].getSymbol() + '"';
        header.appendChild(p2);
        ele.appendChild(header);
    };
    const switchPlayer = () => {
        if(curPlayer === 0 ){
            curPlayer = 1;
        }
        else {
            curPlayer = 0;
        }
    }
    const checkWin = (ele) => {
        if(moves > 4) {
            console.log('check win');
            console.log(board);
            let winner = document.createElement('h1');
            winner.className = 'footer';
            //check accross
            for(let i = 0; i <=6; i +=3){
                if(board[i] === board[i + 1] && board[i] === board[i+2] && board[i] != null){
                    winner.innerHTML = (players[curPlayer].getName() + ' Wins!');
                    done = true;
                    ele.appendChild(winner);
                    break;
                }
            }

            //check diagonal
            if(board[0] === board[4] && board[4] === board[8] && board[0] != null){
                winner.innerHTML = (players[curPlayer].getName() + ' Wins!');
                done = true;
                ele.appendChild(winner);
            }

            if(board[2] === board[4] && board[4] === board[6] && board[0] != null){
                winner.innerHTML = (players[curPlayer].getName() + ' Wins!');
                done = true;
                ele.appendChild(winner);
            }
            //check up-down

            for(let i = 0; i <=2; i++){
                if(board[i] === board[i+3] && board[i] === board[i+6] && board[i] != null){
                    winner.innerHTML = console.log(players[curPlayer].getName() + ' Wins!');
                    done = true;
                    ele.appendChild(winner);
                }
            }
        }
    }
    const playMove = (cell) => {
        if(!done){
            if(cell.innerHTML != 'X' && cell.innerHTML != 'O'){
                cell.innerHTML = players[curPlayer].getSymbol();
                board[cell.className[9]] = players[curPlayer].getSymbol();
                moves++;
                checkWin(disp);
                switchPlayer();
            }
        }
        
    }
    const newBoard = (ele) => {
        board = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
        ele.innerHTML = '';
        moves = 0;
        curPlayer = 0;
        done = false;
        updateDisplay(ele);
        
        let gmeboard = document.createElement('div');
        gmeboard.className = 'board';
        let cell = 0;
        let cl = 'item';
        while (cell < 9){
            let curcell = document.createElement('div');
            let curclass = ' ' + cl + '' + cell;
            curcell.className += cl;
            curcell.className += curclass;
            curcell.addEventListener('click',  () => playMove(curcell));
            gmeboard.appendChild(curcell);
            cell += 1;
        }
        ele.appendChild(gmeboard);
    };
    return {
        addPlayer,
        newBoard,
        getPlayer,

    };
})();

let but = document.getElementById('make');
but.addEventListener('click', () => {
    gameBoard.newBoard(disp);
});