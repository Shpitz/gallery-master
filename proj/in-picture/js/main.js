'use strict';
/*
. gQuests = [{id: 1, opts:[], correctOptIndex:1 }]
gCurrQuestIdx = 0
2. Note: It is convenient to have the images named by the quest
id (e.g. : 1.jpg)
3. If the player is correct, move on to next quest
4. Some more functions:
a. initGame()
b. createQuests()
c. renderQuest()
d. checkAnswer(optIdx)
5. Create 3 questions
*/

var QUESTIONS = 3;

var NEXTQ = 1;
var gQuests;

var Q1IMG = '<img src="img/1.png">';
var Q2IMG = '<img src="img/2.png">';
var Q3IMG = '<img src="img/3.png">';

var IMGS = [Q1IMG, Q2IMG, Q3IMG];

var Q1OPTS = ['Norway 2013', 'Austria 2015'];
var Q2OPTS = ['Ukrain 2017', 'Sweden 2016'];
var Q3OPTS = ['Portugal 2018', 'Denmark 2014'];

var OPTS = [Q1OPTS, Q2OPTS, Q3OPTS];

var CORRECTOPTS = [1, 0, 1];



function initGame() {
    createQuests(QUESTIONS);
    renderQuest(NEXTQ);
}


function createQuests(questions) {
    gQuests = [];
    for (var i = 0; i < questions; i++) {
        gQuests[i] = {
            id: i + 1,
            opts: [OPTS[i][0], OPTS[i][i + 1]],
            correctOptIndex: CORRECTOPTS[i]
        }
    }
}

function renderQuest(qNum) {
    var elImg = document.querySelector('.q-image');
    var elOpts = document.querySelector('.q-opts');

    elImg.innerHTML = IMGS[qNum - 1];

    var strHtml = '';
    for (var i = 0; i < OPTS[qNum - 1].length; i++) {
        strHtml += '<button class="opt-' + (i + 1) + '"';
        strHtml += 'onclick="checkAnswer(this)">'
        strHtml += OPTS[qNum - 1][i];
        strHtml += '</button>';
    }
    elOpts.innerHTML = strHtml;

}


function checkAnswer(el) {
    var elBtn = document.querySelectorAll('button');
    var correctAnswer = elBtn[CORRECTOPTS[NEXTQ - 1]];
    if (el === correctAnswer) {
        NEXTQ++;
    }
    if (NEXTQ <= QUESTIONS) {

        renderQuest(NEXTQ);
    } else {
        alert('Game Over');
    }

}
