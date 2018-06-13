'use strict';
console.log('main');


renderTable();

function renderTable() {
    var strHTMLs = '';
    var books = getBooksToDisplay();
    strHTMLs +=
        `<thead class="thead-light">
                    <tr>
                        <th class="id-head" onclick="onSortClicked(this)">Id</th>
                        <th class="title-head" onclick="onSortClicked(this)">Title</th>
                        <th class="price-head" onclick="onSortClicked(this)">Price</th>
                        <th class="rate-head" onclick="onSortClicked(this)">Rate</th>
                        <th colspan="3">Actions</th>
                    </tr>
                </thead>
                <tbody class="">`;
    var strHTMLs1 = books.map(function (book) {
        return `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.price}</td>
                        <td>${book.rate}</td>
                        <td><button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#view-book" onclick="updateCurrBook('${book.id}')">Read</button></td>
                        <td><button type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#update-price" onclick="updateCurrBook('${book.id}')">Update</button></td>
                        <td><button type="button" class="btn btn-danger btn-sm" onclick="onDeleteBook('${book.id}')">Delete</button></td>
                    </tr>`;
    });
    strHTMLs += strHTMLs1.join('');
    // console.log('strHTMLs', strHTMLs1.join(''));
    strHTMLs += `</tbody>`;
    document.querySelector('.books-container').innerHTML = strHTMLs;
}

function readAndAddNewBook() {
    var elTitle = $('.add-title').val();
    var elPrice = $('.add-price').val();
    // var elTitle = document.querySelector('.add-title').value;
    // var elPrice = document.querySelector('.add-price').value;
    // console.log(elTitle, elPrice);
    addBook(elTitle, elPrice);
    renderTable();
    var elTitle = $('.add-title').val('');
    var elPrice = $('.add-price').val('');
}

function readAndUpdateBook() {
    // console.log('bookId');
    var elPrice = $('.update-price').val();
    updateBook(gCurrBookId, elPrice);
    renderTable();
    gCurrBookId = null;
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderTable();
}

function updateCurrBook(bookId) {
    currentBook(bookId);
    var bookIdx = getBookIdx(bookId);

    var strHTML = '';
    strHTML += gBooks[bookIdx].img;
    strHTML += `<div class="book-details">
                    <p>Price: ${gBooks[bookIdx].price}</p>`;
    strHTML += `<p>Rate: <span class="book-rate">${gBooks[bookIdx].rate}</span></p>`;
    strHTML += `<div class="rate-container">           
                        <div class="rate-up" onclick="onUpdateRate(1)">👍</div>
                        <div class="rate-down" onclick="onUpdateRate(-1)">👎</div>
                    </div>`;
    strHTML += `</div>`;

    // console.log(strHTML);
    // document.querySelector('.read-title').innerText = gBooks[BookIdx].title;
    $('.read-title').text(gBooks[bookIdx].title);
    // document.querySelector('.read-body').innerHTML = strHTML;
    $('.read-body').html(strHTML);

}

function onUpdateRate(num) {
    updateRate(num);
    currentBook(gCurrBookId);
    var bookIdx = getBookIdx(gCurrBookId);
    $('.book-rate').text(gBooks[bookIdx].rate);
    renderTable();
}


function onSortClicked(el) {
        
    sortClicked($(el).text());
    renderTable();

}
