class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // DOM elements
        this.cells = document.querySelectorAll('.cell');
        this.status = document.getElementById('status');
        this.resetBtn = document.getElementById('resetBtn');

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        this.resetBtn.addEventListener('click', () => this.resetGame());
    }

    handleCellClick(cell) {
        const index = cell.getAttribute('data-index');

        if (this.board[index] === '' && this.gameActive) {
            this.board[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            
            if (this.checkWin()) {
                this.status.textContent = `Player ${this.currentPlayer} wins!`;
                this.gameActive = false;
                this.highlightWinningCells();
                return;
            }

            if (this.checkDraw()) {
                this.status.textContent = "Game ended in a draw!";
                this.gameActive = false;
                return;
            }

            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.status.textContent = `Player ${this.currentPlayer}'s Turn`;
        }
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }

    highlightWinningCells() {
        this.winningCombinations.forEach(combination => {
            if (combination.every(index => this.board[index] === this.currentPlayer)) {
                combination.forEach(index => {
                    this.cells[index].classList.add('winner');
                });
            }
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.status.textContent = "Player X's Turn";
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
