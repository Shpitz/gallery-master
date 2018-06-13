var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';

var gGamerPos = { i: 2, j: 9 };
var gBoard = buildBoard();
var gBallsToCollect = 2;
var gColector = 0; // balls colected
var gAddBallInterval = setInterval(addBall, 5000);
var gIsGameOn = false;


renderBoard(gBoard);


function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;
	
	// place one floor in eace border
	var boardHeight = Math.floor(board.length / 2);
	var boardWidth = Math.floor(board[0].length / 2);
	board[boardHeight][0].type = FLOOR;
	board[boardHeight][board[0].length - 1].type = FLOOR;
	board[0][boardWidth].type = FLOOR;
	board[board.length - 1][boardWidth].type = FLOOR;

	console.log(boardWidth);
	console.log(boardHeight);


	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n'; // \n to break the row to a new line
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}
// create a restart gane func for the restart game button
function restartGame() {

	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	gBallsToCollect = 2;
	gColector.innerText = 0;
	gAddBallInterval = setInterval(addBall, 5000);
	gIsGameOn = false;
	elBtn = document.querySelector('.restart');
	// elBtn.classList.toggle('restart');
	elBtn.style.display = 'none';
	renderBoard(gBoard);
}

// Move the player to a specific location
function moveTo(i, j) {
	var isBorderPos = false;
	
	// set i and J for the passages
	if (i < 0 || i >= gBoard.length) {
		isBorderPos = true;
		i = Math.abs(Math.abs(i) - gBoard.length);
	}
	if (j < 0 || j >= gBoard[0].length) {
		isBorderPos = true;
		j = Math.abs(Math.abs(j) - gBoard[0].length);
	}
	// var targetCell = gBoard[i][j];
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || isBorderPos) {
		gIsGameOn = true;



		
		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			//Show how many balls were collected
			gColector = document.querySelector('.colector');
			
			gColector.innerText++;
			if (+gColector.innerText === gBallsToCollect) {
				// console.log('game over elad')
				gameOver();
			}
		}
		
		// MOVING
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);
		isBorderPos = false;

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

function gameOver() {
	gIsGameOn = false;
	clearInterval(gAddBallInterval);
	var elH1 = document.querySelector('h1');
	elH1.innerText = 'GAME OVER';
	var elBtn = document.querySelector('.restart');
	// elBtn.classList.toggle('restart');
	elBtn.style.display = 'block';

	renderBoard(gBoard);
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	
	// if (i === 0 || i === gBoard.length - 1 || j === 0 || j === gBoard[0].length - 1) {
	// 	isBorderPos = true;
	// 	i = Math.abs(i - gBoard.length);
	// 	j = Math.abs(j - gBoard[0].length);
	// }

	switch (event.key) {

		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}


}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

//Every 5 seconds a new ball is added in a random empty cell


function addBall() {
	var rows = gBoard.length;
	var colls = gBoard[0].length;
	var i = getRandomIntInclusive(0, rows - 1);
	var j = getRandomIntInclusive(0, colls - 1);

	var randomCell = gBoard[i][j];
	if (randomCell.type === WALL) return;
	else if (randomCell.gameElement !== null) return;
	else if (gIsGameOn) {
		gBoard[i][j].gameElement = BALL
		gBallsToCollect++;
	}

	renderCell({ i, j }, BALL_IMG);
}


function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
	//The maximum is inclusive and the minimum is inclusive 
}

