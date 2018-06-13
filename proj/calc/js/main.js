'use strict';

var gNum1 = '';
var gNum2 = '';
var gOp = null;
var gRes = null;
var gMemoryNum = 0;

function addDigit(digit) {

    (gOp === null) ? gNum1 += digit : gNum2 += digit;
    render();
}

function deleteDigit() {

    if (gOp !== null) {
        if (gNum2 === '') return;
        else {
            gNum2 = gNum2.slice(0, -1);
        }
    } else {
        if (gNum1 === '') return;
        else {
            gNum1 = gNum1.slice(0, -1);
        }
    }
    render();
}

function memoryBehavior(M) {

    switch (M) {
        case 'MC':
            gMemoryNum = 0;
            break;
        case 'MR':
            (gOp !== null)? gNum2 = gMemoryNum : gNum1 = gMemoryNum;
            break;
        case 'MS':
            if (!gOp) gMemoryNum = gNum1;
            else if (gOp && gNum2 === '') gMemoryNum = gNum1;
            else gMemoryNum = gNum2;
            break;
        case 'M+':
            //                  to complete
            break;
            case 'M-':
            //                  to complete
            break;
    }
    render();
}

function setOp(op) {

    gOp = op;
    if (op === '√' || op === '%') showResult(op);
    render();
}

function toMinus() {
    (gOp === null) ? gNum1 = -gNum1 : gNum2 = -gNum2;
    render();
}

function clear1(element) {

    console.log(element);

    if (element === '=' || element === '√' || element === '%') {
        gNum2 = '';

    } else if (element === 'CE') {
        (gOp !== null) ? gNum2 = '' : gNum1 = '';
    } else if (element === 'C') {
        gNum1 = '';
        gNum2 = '';
        gOp = null;
        gRes = null;
    }
    render();
}

function showResult(element) {

    switch (gOp) {
        case '+':
            gRes = +gNum1 + +gNum2;
            break;
        case '-':
            gRes = +gNum1 - +gNum2;
            break;
        case '×':
            gRes = +gNum1 * +gNum2;
            break;
        case '÷':
            gRes = +gNum1 / +gNum2;
            break;
        case '√':
            gRes = Math.sqrt(+gNum1);
            break;
        case '%':
            gRes = +gNum1 * +gNum2 / 100;
            break;
    }

    gNum1 = gRes;
    clear1(element);
}

function render() {
    var res = ''
    if (gNum1) res += gNum1;
    if (gOp) res += gOp;
    if (gNum2) res += gNum2;
    if (gRes) res = gRes;

    var elRes = document.querySelector('.screen');
    elRes.innerText = res;
    console.log('gNum1: ', gNum1 + ' gNum2: ', gNum2 + ' gOp: ', gOp + ' gRes: ', gRes + ' gMemoryNum: ', gMemoryNum);
}
