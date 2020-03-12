// drawing a square
import { context, row, column, squareSize, vacant_color} from './dom.js';
function drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    context.strokeSyle = "black";
    context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

// creating a board
let board = [];
let r = 0;
let c = 0;
for (r = 0; r < row; r++) {
    board[r] = [];
    for (c = 0; c < column; c++) {
        board[r][c] = vacant_color;
    }
}


//draw the board
function drawBoard() {
    for (r = 0; r < row; r++) {
        for (c = 0; c < column; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

export { drawBoard, drawSquare, board};