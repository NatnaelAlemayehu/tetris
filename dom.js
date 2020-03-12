const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
const row = 20;
const column = 10;
const squareSize = 20;
const vacant_color = "white"; // color of empty square
const scoreElement = document.getElementById("score");


export { context, row, column, squareSize, vacant_color, scoreElement};