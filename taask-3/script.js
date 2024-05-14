let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let result = document.getElementById('result');

function playerMove(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;
        if (checkWinner(currentPlayer)) {
            result.innerText = `Player ${currentPlayer} wins!`;
            disableBoard();
        } else if (checkTie()) {
            result.innerText = 'It\'s a tie!';
            disableBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner(player) {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            return true;
        }
    }
    // Check diagonals
    if ((board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
        (board[0][2] === player && board[1][1] === player && board[2][0] === player)) {
        return true;
    }
    return false;
}

function checkTie() {
    for (let row of board) {
        for (let cell of row) {
            if (cell === '') {
                return false;
            }
        }
    }
    return true;
}

function disableBoard() {
    for (let cell of document.getElementsByClassName('cell')) {
        cell.onclick = null;
    }
}

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    result.innerText = '';
    for (let cell of document.getElementsByClassName('cell')) {
        cell.innerText = '';
        cell.onclick = function() {
            let row = Math.floor(Array.from(document.getElementsByClassName('cell')).indexOf(this) / 3);
            let col = Array.from(document.getElementsByClassName('cell')).indexOf(this) % 3;
            playerMove(row, col);
        }
    }
}