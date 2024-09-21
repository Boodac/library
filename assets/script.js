// dom code

const container = document.querySelector(".container");
const card = document.createElement("section");
const newBookBtn = document.querySelector(".new-book");
const formContainer = document.querySelector("#form-container");


newBookBtn.addEventListener("click", (e) => {
    (formContainer.style["display"] === "none") ? formContainer.style["display"] = "flex" : formContainer.style["display"] = "none";
});

// library code

let myLibrary = [];

function Book(bookName = "The Default Book", authorName = "boodac", yearPublished = "1973", status = "unread", pageCount = 0, wordCount = 0) {
    this.name = bookName;
    this.author = authorName;
    this.year = yearPublished;
    this.wordCount = wordCount;
    this.pageCount = pageCount;
    this.status = status;
    this.id = undefined;

    if(wordCount > 0) {
        this.length = wordCount;
    } else if (pageCount > 0) {
        this.length = pageCount;
    } else this.length = -1;
}

function addBookToCollection(bookObject, bookCollection) {
    bookCollection.push(bookObject);
    bookObject.id = bookCollection.indexOf(bookObject);
}