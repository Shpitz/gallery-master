'use strict';

// var MINE = '💣';
// var FLAG = '🚩';
// var BOMB = '💥';

var blank = '<img src="img/blank.gif" alt="">'
var bombDeath = '<img src="img/bombdeath.gif" alt="">'
var bombFlagged = '<img src="img/bombflagged.gif" alt="">'
var bombMisFlagged = '<img src="img/bombmisflagged.gif" alt="">'
var bombRevealed = '<img src="img/bombrevealed.gif" alt="">'
var open0 = '<img src="img/open0.gif" alt="">'
var open1 = '<img src="img/open1.gif" alt="">'
var open2 = '<img src="img/open2.gif" alt="">'
var open3 = '<img src="img/open3.gif" alt="">'
var open4 = '<img src="img/open4.gif" alt="">'
var open5 = '<img src="img/open5.gif" alt="">'
var open6 = '<img src="img/open6.gif" alt="">'
var open7 = '<img src="img/open7.gif" alt="">'
var open8 = '<img src="img/open8.gif" alt="">'

var gBoard = null;

// var gLevel = null;
var gLevel = {
    size: 4,
    mines: 2
};

var gState = {
    isGameOn: false,
    showCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var startTime = null;

// var gMines = 0;

function init() {
    clearInterval(startTime);
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = 'Time:';
    var elMines = document.querySelector('.mines');
    elMines.innerText = gLevel.mines;
    var elGreet = document.querySelector('.g2');
    elGreet.classList.add('g1');
    gState = {
        isGameOn: false,
        showCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = buildBoard();
    renderBoard(gBoard);
    
}

function buildBoard() {
    // Create the Matrix
    var board = new Array(gLevel.size);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(gLevel.size);
    }


    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { isBomb: false, bombsAroundCount: 0, isMarked: false, isShown: false };
            // board[i][j] = setMine(cell);
            board[i][j] = cell;
            // if (cell.isBomb === true) gMines++;
            // cell = { isBomb: false, bombsAroundCount: 0, isMarked: false, isShown: false };
        }
    }
    // setMine(board);
    // setMineNegsCount(board);
    return board;
    console.log(board);
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '<table oncontextmenu="return false;">\n\t<tbody border: 1px solid black>\n';
    for (var i = 0; i < board.length; i++) {
        strHTML += '\t<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            var cellClass = getClassName({ i: i, j: j })
            strHTML += `\t<td class=${cellClass} onclick="cellClicked(this, ${i}, ${j})"
            oncontextmenu="cellMarked(this, ${i}, ${j})">${blank}</td>\n`;
        }
        strHTML += '</tr>\n';
    }
    strHTML += '</tbody>\n</table>\n';
    elBoard.innerHTML = strHTML;
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (gState.isGameOn === false && gState.showCount === 0) {
        setMine(gBoard, i, j);
        setMineNegsCount(gBoard);
        gState.isGameOn = true;
        startTime = setInterval(timer, 1000);
        // elCell.innerHtml = '';
        console.log(cell.bombsAroundCount);
        
        
        // if (cell.bombsAroundCount === 0) {
        //     elCell.innerHTML = '';
        // } else {
        //     // elCell.innerText = cell.bombsAroundCount;
        // }
        elCell.innerHTML = setCellImg(cell.bombsAroundCount);
        cell.isShown = true;
        elCell.classList.add('shown');
        gState.showCount++;
        if (cell.bombsAroundCount === 0) expandShownBonus(elCell, i, j);
    }
    if (gState.isGameOn === false) return;

    if (cell.isMarked === true) return;
    if (cell.isShown === true) return;
    if (cell.isBomb === true) {
        cell.isShown = true;
        gState.showCount++;
        // elCell.classList.add('game-over');
        // elCell.innerText = BOMB;
        elCell.innerHTML = bombDeath;
        checkGameOver(elCell, i, j);
    } else {
        if (cell.isBomb === false && cell.isShown === false) {
            cell.isShown = true;
            elCell.classList.add('shown');
            gState.showCount++;
            elCell.innerHTML = setCellImg(cell.bombsAroundCount);
            // if (cell.bombsAroundCount === 0) {
            //     elCell.innerHTML = '';
            // } else {
            //     elCell.innerText = cell.bombsAroundCount;
            // }
            if (cell.bombsAroundCount === 0) expandShownBonus(elCell, i, j);
            // if (gLevel.size**2 === gState.showCount + gState.isMarked) {
            // }
            checkGameOver(elCell, i, j);
        }
    }
    // cell.isShown = true;

    console.log(elCell);
    console.log(gBoard[i][j]);
    console.log(gState);
}

function cellMarked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (gState.isGameOn === false) return;
    if (cell.isShown === true) return;
    // if (gState.showCount > 0 || gState.markedCount > 0) return;
    var elMines = document.querySelector('.mines');
    if (cell.isMarked === false) {
        cell.isMarked = true;
        gState.markedCount++;
        elMines.innerText--;
        // elCell.innerText = FLAG;
        elCell.innerHTML = bombFlagged;
        checkGameOver(elCell, i, j);

    } else {
        cell.isMarked = false;
        gState.markedCount--;
        elMines.innerText++;
        elCell.innerHTML = blank;
    }
    console.log(elCell);
    console.log(gBoard[i][j]);
    console.log(gState);

}

// function expandShown(elCell, i, j) {

//     // var cell = gBoard[i][j];
//     // if (gBoard[i][j].bombsAroundCount === 0 && gBoard[i][j].isShown === true) {
//     for (var x = i - 2; x <= i + 2; x++) {
//         for (var y = j - 2; y <= j + 2; y++) {

//             if (x < 0 || y < 0 || x >= gBoard.length || y >= gBoard.length) continue;
//             if (gBoard[x][y].isShown === true || gBoard[x][y].isBomb === true || gBoard[x][y].isMarked === true) continue;
//             gBoard[x][y].isShown = true;
//             gState.showCount++;
//             var cellClass = getClassName({ i: x, j: y })
//             var elCell = document.querySelector(`.${cellClass}`);
//             // elCell.innerHtml = '';
//             // elCell.innerHtml = setCellImg(gBoard[x][y].bombsAroundCount);
//             if (gBoard[x][y].bombsAroundCount === 0) {
//                 elCell.innerHTML = '';
//             } else {
//                 elCell.innerText = gBoard[x][y].bombsAroundCount;
//             }
//             elCell.classList.add('shown');
//             // console.log(elCell);
//         }
//     }
//     // }
// }

function expandShownBonus(elCell, i, j) {

    // var cell = gBoard[i][j];
    // if (gBoard[i][j].bombsAroundCount === 0 && gBoard[i][j].isShown === true) {
    for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {

            if (x < 0 || y < 0 || x >= gBoard.length || y >= gBoard.length) continue;
            if (gBoard[x][y].isShown === true || gBoard[x][y].isBomb === true || gBoard[x][y].isMarked === true) continue;
            gBoard[x][y].isShown = true;
            gState.showCount++;
            var cellClass = getClassName({ i: x, j: y })
            var elCell = document.querySelector(`.${cellClass}`);
            // elCell.innerHtml = '';
            // elCell.innerHtml = setCellImg(gBoard[x][y].bombsAroundCount);
            if (gBoard[x][y].bombsAroundCount === 0) {
                expandShownBonus(elCell, x, y);
                elCell.innerHTML = setCellImg(gBoard[x][y].bombsAroundCount);
                // elCell.innerHTML = '';
            } else {
                elCell.innerHTML = setCellImg(gBoard[x][y].bombsAroundCount);
                // elCell.innerText = gBoard[x][y].bombsAroundCount;
            }
            elCell.classList.add('shown');
            // console.log(elCell);
        }
    }
    // }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellClass) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    console.log('coord', coord);
    return coord;
}

function setMineNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            cell.bombsAroundCount = countMineNegs(board, i, j);
        }
    }
}


function countMineNegs(board, row, coll) {

    var mineNegsCount = 0;
    for (var i = row - 1; i <= row + 1; i++) {
        for (var j = coll - 1; j <= coll + 1; j++) {
            if (i < 0 || i >= board.length || j < 0 || j >= board[row].length) continue;
            else if (i === row && j === coll) continue;
            else if (board[i][j].isBomb === false) continue;
            else mineNegsCount++;
        }
    }
    return mineNegsCount;
}





function checkGameOver(elCell, i, j) {
    var elGreet = document.querySelector('.g2');
    // console.log(elGameDone);




    // if (gBoard[i][j].isBomb === true) {
    //     elCell.innerText = BOMB;
    //     // gBoard[i][j].isShown = true;
    //     // gState.showCount ++;
    //     gState.isGameOn = false;
    //     showBombs();
    //     console.log('GAME OVER');

    // }
    var cells = gLevel.size ** 2;
    // if (gBoard[i][j].isBomb === true && gBoard[i][j].isMarked === false) {
    //     elCell.innerText = BOMB;
    //     // gBoard[i][j].isShown = true;
    //     // gState.showCount ++;
    //     gState.isGameOn = false;
    //     showBombs();
    //     console.log('GAME OVER');
    // }

    if (gBoard[i][j].isBomb === true && gBoard[i][j].isMarked === false) {
        // elCell.innerText = BOMB;
        elCell.innerHtml = bombDeath;
        // gBoard[i][j].isShown = true;
        // gState.showCount ++;
        showBombs();
        gState.isGameOn = false;
        clearInterval(startTime);
        elGreet.innerText = 'GAME OVER';
        elGreet.classList.remove('g1');
        console.log('GAME OVER');
        var face = document.querySelector('.face');
        // face.innerHTML = '<img src="img/facedead.gif" alt="">';
        
    } else if (cells === gState.showCount + gState.markedCount && gState.markedCount === gLevel.mines) {
        gState.isGameOn = false;
        clearInterval(startTime);
        elGreet.innerText = 'YOU WON!';
        elGreet.classList.remove('g1');

        console.log('GOOD JOB');
        // } else if (gBoard[i][j].isMarked) {
        //     return;
    }
    // gState.isGameOn === false;
    // if (gState.isGameOn === true) {

    //     console.log(elCell);
    //     // console.log(gBoard[i][j]);
    //     console.log(gState);
    // }
}

function showBombs() {
    for (var x = 0; x < gBoard.length; x++) {
        for (var z = 0; z < gBoard.length; z++) {
            var cell = gBoard[x][z];
            var cellClass = getClassName({ i: x, j: z })
            var elBombCell = document.querySelector(`.${cellClass}`);
            if (cell.isShown === true) continue;
            if (cell.isBomb === false && cell.isMarked === true) {
                // elBombCell.innerText = MINE;
                elBombCell.innerHTML = bombMisFlagged;
                // elBombCell.classList.add('game-over');
            }
            if (cell.isBomb === true && cell.isMarked === false) {
                elBombCell.classList.add('shown');
                // elBombCell.innerText = MINE;
                elBombCell.innerHTML = bombRevealed
            }
        }

    }

}




// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    //The maximum is inclusive and the minimum is inclusive 
}

function setBoardSize(size, mines) {
    gLevel = { size: size, mines: mines };
    init();

}

// function setMine(cell) {

//     if (Math.random() <= gLevel.mines / (gLevel.size) ** 2) {
//         cell.isBomb = true;
//     }
//     return cell;
// }
// startTime = setInterval(timer, 1000);

function timer() {
    console.log(document.querySelector('.mines'));


    gState.secsPassed++
    var timeSec = gState.secsPassed;
    var elTime = document.querySelector('.timer');
    elTime.innerText = `Time: ${timeSec}`;
    // console.log(elTime);
    // console.log(document.querySelector('.mines'));
    console.log(gState.secsPassed);

}

// function setMines(board, i, j) {
//     var mines = gLevel.mines;

// }

function setMine(board, i, j) {
    var mines = gLevel.mines;
    var rows = board.length - 1;
    var colls = board.length - 1;
    // var x = 0;
    // var y = 0;

    while (mines !== 0) {
        var x = getRandomIntInclusive(0, rows);
        var y = getRandomIntInclusive(0, colls);
        // x = 1;
        // y = 2;
        var randomCell = board[x][y];
        if (x === i && y === j) continue;
        if (randomCell.isBomb === true) continue;
        else {
            randomCell.isBomb = true;
            mines--;
        }
    }
}
setCellImg(0);
function setCellImg(num) {
    
    switch (num) {
        case 0: 
        console.log(open0);
        
        return open0;
        break;
        case 1: 
        console.log(open1);
        
        return open1;
        break;
        case 2: return open2;
        break;
        case 3: return open3;
        break;
        case 4: return open4;
        break;
        case 5: return open5;
        break;
        case 6: return open6;
        break;
        case 7: return open7;
        break;
        case 8: return open8;
        break;

    }

}
