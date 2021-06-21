const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.font = "50px Georgia"
let canvasPosition = canvas.getBoundingClientRect();

blackColor = "rgb(111, 143, 114)";
whiteColor = "rgb(173, 189, 143)";
highlightedBlack = "rgb(100, 0, 0)";
highlightedWhite = "rgb(255, 0, 0)";

var blackPieces = new Array();
var whitePieces = new Array();
var whiteToPlay = true;
var board = new Array(8);
var selectedSquare = null;
var moves = [];

for (let i = 0; i < board.length; i++) {
    board[i] = new Array(8);
}

columnLetters = ["a", "b", "c", "d", "e", "f", "g", "h"]

whiteLetters = ["K", "Q", "R", "B", "N", "P"];
blackLetters = ["k", "q", "r", "b", "n", "p"];
startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

for (let i = 0; i < 6; i++){
    blackPieces[i] = new Image();
    blackPieces[i].src = "pieces/black/" + blackLetters[i] + ".svg"
}
for (let i = 0; i < 6; i++){
    whitePieces[i] = new Image();
    whitePieces[i].src = "pieces/white/" + whiteLetters[i] + ".svg"
}

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

canvas.addEventListener("mousedown", function(event){
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    let clickedSquare = '' + Math.floor(mouse.x/100) + Math.floor(mouse.y/100);
    let clickedPiece = pieceAt(clickedSquare);
    if (selectedSquare == null){
        updateBoard(legalMoves(clickedSquare, clickedPiece));
    } else {
        if (moves.includes(clickedSquare)){
            move(selectedSquare.charAt(0), selectedSquare.charAt(1), clickedSquare.charAt(0), clickedSquare.charAt(1));
            selectedSquare = null;
        } else if ((pieceAt(clickedSquare) == pieceAt(clickedSquare).toUpperCase()) == whiteToPlay){
            updateBoard(legalMoves(clickedSquare, clickedPiece));
        }
    }
})

let blackTile = false;

function pieceAt(square){
    console.log(square);
    return board[square.charAt(1)][square.charAt(0)];
}

function legalMoves(square, piece){
    pieceType = piece.toLowerCase();
    squareXY = [parseInt(square.charAt(1)), parseInt(square.charAt(0))];
    availableMoves = [];
    moves = [];
    if (((piece == piece.toUpperCase() && whiteToPlay) || (piece == piece.toLowerCase() && !whiteToPlay)) && piece != "1"){
        if (pieceType == "k"){
            availableMoves.push('' + (squareXY[1] + 1) + (squareXY[0] + 1));
            availableMoves.push('' + (squareXY[1] + 0) + (squareXY[0] + 1));
            availableMoves.push('' + (squareXY[1] - 1) + (squareXY[0] + 0));
            availableMoves.push('' + (squareXY[1] - 1) + (squareXY[0] + 1));
            availableMoves.push('' + (squareXY[1] - 1) + (squareXY[0] - 1));
            availableMoves.push('' + (squareXY[1] + 0) + (squareXY[0] - 1));
            availableMoves.push('' + (squareXY[1] + 1) + (squareXY[0] - 1));
            availableMoves.push('' + (squareXY[1] + 1) + (squareXY[0] + 0));
            availableMoves.forEach(element => {
                console.log(element)
                if (whiteToPlay){
                    if (pieceAt(element).toUpperCase() != pieceAt(element) || pieceAt(element) == "1"){
                        moves.push(element);
                    }
                } else {
                    if (pieceAt(element).toLowerCase() != pieceAt(element) || pieceAt(element) == "1"){
                        moves.push(element);
                    }
                }
            });
        } else if (pieceType == "q"){
            for (let i = 1; i < 8; i++) {
                moves.push('' + (squareXY[1] + i) + (squareXY[0] + i));
                moves.push('' + (squareXY[1] + i) + (squareXY[0] - i));
                moves.push('' + (squareXY[1] - i) + (squareXY[0] + i));
                moves.push('' + (squareXY[1] - i) + (squareXY[0] - i));

                moves.push('' + (squareXY[1] + i) + (squareXY[0]));
                moves.push('' + (squareXY[1] - i) + (squareXY[0]));
                moves.push('' + (squareXY[1]) + (squareXY[0] + i));
                moves.push('' + (squareXY[1]) + (squareXY[0] - i));
            }
        } else if (pieceType == "r"){
            for (let i = 1; i < 8; i++) {
                moves.push('' + (squareXY[1] + i) + (squareXY[0]));
                moves.push('' + (squareXY[1] - i) + (squareXY[0]));
                moves.push('' + (squareXY[1]) + (squareXY[0] + i));
                moves.push('' + (squareXY[1]) + (squareXY[0] - i));            
            }
        } else if (pieceType == "b"){
            for (let i = 1; i < 8; i++){
                moves.push('' + (squareXY[1] + i) + (squareXY[0] + i));
                moves.push('' + (squareXY[1] + i) + (squareXY[0] - i));
                moves.push('' + (squareXY[1] - i) + (squareXY[0] + i));
                moves.push('' + (squareXY[1] - i) + (squareXY[0] - i));
            }
        } else if (pieceType == "n"){
            moves.push('' + (squareXY[1] - 2) + (squareXY[0] - 1));
            moves.push('' + (squareXY[1] - 2) + (squareXY[0] + 1));
            moves.push('' + (squareXY[1] - 1) + (squareXY[0] - 2));
            moves.push('' + (squareXY[1] - 1) + (squareXY[0] + 2));
            moves.push('' + (squareXY[1] + 1) + (squareXY[0] - 2));
            moves.push('' + (squareXY[1] + 1) + (squareXY[0] + 2));
            moves.push('' + (squareXY[1] + 2) + (squareXY[0] - 1));
            moves.push('' + (squareXY[1] + 2) + (squareXY[0] + 1));
        } else if (piece == "p"){
            if (pieceAt('' + (squareXY[1]) + (squareXY[0] + 1)) == "1"){
                moves.push('' + (squareXY[1]) + (squareXY[0] + 1));
            }
            if (squareXY[0] == "1" && pieceAt('' + (squareXY[1]) + (squareXY[0] + 2)) == "1"){
                moves.push('' + (squareXY[1]) + (squareXY[0] + 2));
            }
            if (pieceAt('' + (squareXY[1] + 1) + (squareXY[0] + 1)) != "1" && pieceAt('' + (squareXY[1] + 1) + (squareXY[0] + 1)).toUpperCase() == pieceAt('' + (squareXY[1] + 1) + (squareXY[0] + 1))){
                moves.push('' + (squareXY[1] + 1) + (squareXY[0] + 1))
            }
            if (pieceAt('' + (squareXY[1] - 1) + (squareXY[0] + 1)) != "1" && pieceAt('' + (squareXY[1] - 1) + (squareXY[0] + 1)).toUpperCase() == pieceAt('' + (squareXY[1] - 1) + (squareXY[0] + 1))){
                moves.push('' + (squareXY[1] - 1) + (squareXY[0] + 1))
            }
        } else if (piece == "P"){
            if (pieceAt('' + (squareXY[1]) + (squareXY[0] - 1)) == "1"){
                moves.push('' + (squareXY[1]) + (squareXY[0] - 1));
            }
            if (squareXY[0] == "6" && pieceAt('' + (squareXY[1]) + (squareXY[0] - 2)) == "1"){
                moves.push('' + (squareXY[1]) + (squareXY[0] - 2));
            }
            if (pieceAt('' + (squareXY[1] + 1) + (squareXY[0] - 1)) != "1" && pieceAt('' + (squareXY[1] + 1) + (squareXY[0] - 1)).toLowerCase() == pieceAt('' + (squareXY[1] + 1) + (squareXY[0] - 1))){
                moves.push('' + (squareXY[1] + 1) + (squareXY[0] - 1))
            }
            if (pieceAt('' + (squareXY[1] - 1) + (squareXY[0] - 1)) != "1" && pieceAt('' + (squareXY[1] - 1) + (squareXY[0] - 1)).toLowerCase() == pieceAt('' + (squareXY[1] - 1) + (squareXY[0] - 1))){
                moves.push('' + (squareXY[1] - 1) + (squareXY[0] - 1))
            }
        }
        selectedSquare = square;
    }
    if (piece == "1"){
        selectedSquare = null;
    }
    return moves;
}

function setUpBoard(fen, highlighted) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (highlighted.includes('' + i + j)){
                if (blackTile){
                    ctx.fillStyle = highlightedBlack;
                } else {
                    ctx.fillStyle = highlightedWhite;
                }
            } else if (blackTile){
                ctx.fillStyle = blackColor;
            } else {
                ctx.fillStyle = whiteColor;
            }
            ctx.fillRect(i*100, j*100, 100, 100);
            blackTile = !blackTile;
        }
        blackTile = !blackTile;
    }

    let data = fen.split(" ");
    let out = "";

    if (data[1] == "w"){
        whiteToPlay = true;
    } else if (data[1] == "b") {
        whiteToPlay = false;
    }

    for (let i = 0; i < data[0].length; i++) {
        const char = data[0].charAt(i);
        if (!isNaN(parseInt(char, 10))){
            out += "1".repeat(parseInt(char));
        } else {
            out += char;
        }
    }
    data[0] = out;

    let lines = data[0].split("/");

    for (let i = 0; i < lines.length; i++){
        const line = lines[i];
        for (let j = 0; j < 8; j++) {
            letter = line.charAt(j);
            if (blackLetters.includes(letter) || whiteLetters.includes(letter)){
                if (letter.toLowerCase() == letter){
                    ctx.drawImage(blackPieces[blackLetters.indexOf(letter)], j*100, i*100, 100, 100);
                    board[i][j] = letter;
                } else {
                    ctx.drawImage(whitePieces[whiteLetters.indexOf(letter)], j*100, i*100, 100, 100);
                    board[i][j] = letter;
                }
            } else {
                board[i][j] = "1";
            }
        }
    }
}

function updateBoard(highlighted){
    let out = "";
    let lineOut = "";
    for (let i = 0; i < board.length; i++) {
        const line = board[i];
        for (let j = 0; j < line.length; j++) {
            const square = line[j];
            lineOut += square;
        }
        out += lineOut;
        lineOut = "";
        if (i < 7){
            out += "/";
        }
    }
    setUpBoard(out, highlighted);
}

function move(fromX, fromY, toX, toY){
    let piece = board[fromY][fromX]
    board[fromY][fromX] = "1";
    board[toY][toX] = piece;
    whiteToPlay = !whiteToPlay;
    updateBoard([]);
}

whitePieces[5].onload = function(){
    setUpBoard(startFen, []);
}