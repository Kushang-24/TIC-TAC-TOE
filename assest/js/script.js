const squares = document.querySelectorAll('.square');
const scoreboard = document.getElementById('scoreboard');
const resultDiv = document.getElementById('result');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let score = { 'X': 0, 'O': 0 };

squares.forEach(square => {
    square.addEventListener('click', () => {
        const index = square.getAttribute('data-index');
        if (board[index] === '' && !isGameOver()) {
            board[index] = currentPlayer;
            square.innerHTML = currentPlayer;
            if (checkWin(currentPlayer)) {
                score[currentPlayer]++;
                scoreboard.innerHTML = `Player X: ${score['X']} <br /> Player O: ${score['O']}`;
                resultDiv.innerHTML = `Player ${currentPlayer} wins!`;
                resultDiv.style.color = 'white';
                resultDiv.style.fontSize = '30px';
                currentPlayer = 'X';
                setTimeout(resetGame, 2000);
            } else if (checkDraw()) {
                resultDiv.innerHTML = `It's a draw!`;
                resultDiv.style.color = 'white';
                setTimeout(resetGame, 2000);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

function checkWin(player) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] === player && board[b] === player && board[c] === player;
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function isGameOver() {
    return checkWin('X') || checkWin('O') || checkDraw();
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    squares.forEach(square => square.innerHTML = '');
    resultDiv.innerHTML = '';
}