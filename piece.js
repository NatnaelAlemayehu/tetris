import { row, column, vacant_color, scoreElement } from './dom.js';
import { I, J, L, O, S, T, Z } from './tetrominoes.js';
import { drawBoard, drawSquare, board } from './board.js';

//the pieces and their colors
const PIECES = [[Z, "red"], [S, "green"], [T, "yellow"], [O, "blue"], [L, "purple"], [I, "cyan"], [J, "orange"]];
let score = 0;
let r = 0;
let c = 0;
let y = 0;
class Pieces {

    // creating object piece
    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoNumber = 0; // starting from the first tetrimino pattern
        this.activeTetromino = this.tetromino[this.tetrominoNumber];

        //controlling the pieces
        this.x = 3;
        this.y = -2;
    }

    fill(color) {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) {
                //we draw only occupied squares
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    };

    draw() {
        this.fill(this.color);
    }

    unDraw() {
        this.fill(vacant_color);
    }

    moveDown() {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        }
        else {
            this.lock();
            p = randomPiece();
        }
    }

    moveRight() {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    moveLeft() {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoNumber + 1) % this.tetromino.length];
        let kick = 0;
        if (this.collision(0, 0, nextPattern)) {
            if (this.x > column / 2) {
                kick = -1; // move piece to left
            } else {
                kick = 1; // move to right
            }

        }
        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoNumber = (this.tetrominoNumber + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoNumber];
            this.draw();
        }
    }

    lock() {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) {
                //skip vacan squares
                if (!this.activeTetromino[r][c]) {
                    continue;
                }
                //piece to lock on top = game over
                if (this.y + r < 0) {
                    alert("Game Over");
                    gameOver = true;
                    break;
                }
                // lock the piece
                board[this.y + r][this.x + c] = this.color;
            }
        }
        // remove full rows
        for (r = 0; r < row; r++) {
            let isRowFull = true;
            for (c = 0; c < column; c++) {
                isRowFull = isRowFull && (board[r][c] != vacant_color);
            }
            if (isRowFull) {
                // move all rows above it down
                for (y = r; y > 1; y--) {
                    for (c = 0; c < column; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }
                for (c = 0; c < column; c++) {
                    board[0][c] = vacant_color;
                }
                //increment score by 10
                score += 10;
            }
        }
        //update the board
        drawBoard();
        scoreElement.innerHTML = score;
    }

    collision (x, y, piece){
        for (r = 0; r < piece.length; r++) {
            for (c = 0; c < piece.length; c++) {
                //if the square is empty we skip it
                if (!piece[r][c]) {
                    continue;
                }
                //cordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;

                //conditions
                if (newX < 0 || newX >= column || newY >= row) {
                    return true;
                }
                // skip newY < 0; board[-1] will crush our game
                if (newY < 0) {
                    continue;
                }
                // check if there is locked piece already in place
                if (board[newY][newX] != vacant_color) {
                    return true;
                }
            }
        }
        return false;
    }
}


//Generate random piece
function randomPiece() {
    let randomNumber = Math.floor(Math.random() * PIECES.length)
    return new Pieces(PIECES[randomNumber][0], PIECES[randomNumber][1]);
}


//initiate a piece
let p = randomPiece();

export { p };