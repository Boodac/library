// dom code

const container = document.querySelector(".container");
const card = document.createElement("section");

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