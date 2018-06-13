'use strict';

var BOOKS_KEY = 'bookshop';
var gBooks = [];
var gBookSort = 'Title';
var gCurrBookId = null;

createBooks();

function createBooks() {

    var books = loadFromStorage(BOOKS_KEY);
    if (!books || books.length === 0) {
        books = [];
        books.push(createBook('Run Lola Run', 29.90, `<img src="img/1-dummy_cover.jpg">`));
        books.push(createBook('Anna Carenina', 21.90, `<img src="img/2-dummy_cover.jpg">`));
        books.push(createBook('Eurovision History', 49.90, `<img src="img/3-dummy_cover.jpg">`));
        books.push(createBook('Master CSS', 28.90, `<img src="img/4-dummy_cover.jpg">`));
        books.push(createBook('Do It Now', 9.90, `<img src="img/5-dummy_cover.jpg">`));
    }
    gBooks = books;
    saveBooks();
}


function createBook(name, price, img) {
    return {
        id: makeId(),
        title: name,
        price: price,
        img: `<img src="img/1-dummy_cover.jpg">`,
        rate: 0,

    }
}

function addBook(name, price) {
    gBooks.push(createBook(name, price));
    saveBooks();
}

function getBooksToDisplay() {
    var books = [];
    gBooks.forEach(function (book) {
        if (gBookSort === 'Title' ||
            gBookSort === 'Price' ||
            gBookSort === 'Id' ||
            gBookSort === 'rate') {
            books.push(book);
        }
    });
    return books;
}

function deleteBook(bookId) {
    var bookIdx = getBookIdx(bookId);
    gBooks.splice(bookIdx, 1);
    saveBooks();
}

function updateBook(bookId, bookPrice) {
    var bookIdx = getBookIdx(bookId);
    gBooks[bookIdx].price = bookPrice;
    saveBooks();
}

function currentBook(bookId) {
    var bookIdx = getBookIdx(bookId);
    gCurrBookId = gBooks[bookIdx].id;
}

function getBookIdx(bookId) {
    var bookIdx = null;
    for (var i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id === bookId) bookIdx = i;
    }
    return bookIdx;
}

function saveBooks() {
    saveToStorage(BOOKS_KEY, gBooks);
}

function updateRate(num) {
    var bookIdx = getBookIdx(gCurrBookId);
    gBooks[bookIdx].rate += num;
    saveBooks();   
}

function sortClicked(sortBy) {
    gBookSort = sortBy;
    console.log(gBookSort);
    
}

