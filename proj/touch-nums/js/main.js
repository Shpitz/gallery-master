'use strict';

var gSize = 16;
var gNums = null;
var gNextNumber = 1;
// var gGameOn = false;
var gTimer = 0;
var gTimeInterval = -Infinity;


printGame(gSize);

function printGame(size) {
    resetGame();

    resetNums(size);
    gSize = size;

    var elTblGame = document.querySelector('.tblGame');

    var strHTML = '';
    for (var i = 0; i < Math.sqrt(size); i++) {
        strHTML += '<tr>';

        for (var j = 0; j < Math.sqrt(size); j++) {
            strHTML += '<td onclick="cellClicked(this.innerText)">' + gNums[0] + '</td>'
            gNums.shift();
        }
        strHTML += '</tr>'
    }
    elTblGame.innerHTML = strHTML;
}

function cellClicked(clickedNum) {

    if (+clickedNum === gNextNumber && +clickedNum === 1) {
        gTimeInterval = setInterval(updateTimer, 1000);
        gNextNumber++;
        console.log('clickedNum ', clickedNum, ' gNextNumber ', gNextNumber);
    } else if (+clickedNum === gNextNumber) {
        gNextNumber++;
        console.log('clickedNum ', clickedNum, ' gNextNumber ', gNextNumber);
    } else {
        return;
    }

    if (gNextNumber > gSize) gameOver();

}
function gameOver() {
    console.log('gameOver ', gNextNumber);
    clearInterval(gTimeInterval);
}

function newGame() {
    printGame(gSize);
}

function resetGame() {
    clearInterval(gTimeInterval);
    gTimer = 0;
    gNextNumber = 1;
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = gTimer;
}


function updateTimer() {
    gTimer++;

    var elTimer = document.querySelector('.timer');
    elTimer.innerText = gTimer;
}


function resetNums(size) {

    var nums = [];
    var number = 1;
    while (number !== size + 1) {
        nums.push(number);
        number++
    }
    gNums = shuffle(nums);
    return nums;
}

function shuffle(nums) {
    var j, x, i;
    for (i = nums.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = nums[i];
        nums[i] = nums[j];
        nums[j] = x;
    }
    return nums;
}