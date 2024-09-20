// dom code

const body = document.querySelector("body");

const newBookBtn = document.createElement("button");
newBookBtn.textContent = "NEW BOOK";
newBookBtn.classList.add("new-book");

const container = document.createElement("main");

body.appendChild(newBookBtn);

// library code

let myLibrary = [];

function Book(bookName, authorName, yearPublished, wordCount) {
    this.name = bookName;
    this.author = authorName;
    this.year = yearPublished;
    this.length = wordCount;
    this.status = "unread";
    this.id = undefined;
}

function addBookToCollection(bookObject, bookCollection) {
    bookCollection.push(bookObject);
    bookObject.id = bookCollection.indexOf(bookObject);
}