
// dom code
const template = document.querySelector("#bookCard");
const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book");
const formContainer = document.querySelector("#form-container");
const formClose = document.querySelector("#formClose");
const submitBtn = document.querySelector(".submission");
formContainer.toggle = () => {
    (formContainer.style["display"] === "flex") ? formContainer.style["display"] = "none" : formContainer.style["display"] = "flex";
};

submitBtn.addEventListener("click", (e) => {
    const entries = document.querySelectorAll("input");
    // abort form if the entire thing is blank
    if(entries[0].value == "" && entries[1].value == "" && entries[2].value == "" &&
        entries[3].value == "" && entries[4].value == "" && entries[5].value == ""
        && entries[6].value == "")
    {
        e.preventDefault();    
        return;
    }

    // need at least a book name
    if(entries[0].value == "") {
        e.preventDefault();
        return;
    } 

    // no books from the future
    if(entries[4].value > 2024) {
        e.preventDefault();
        return;
    }

    let bookName = entries[0].value;
    let author = entries[1].value;
    let pageCount = entries[2].value;
    let wordCount = entries[3].value;
    let yearPublished = entries[4].value;
    let isbn13 = entries[5].value;
    let genre = entries[6].value;
    let status = entries[7].checked;
    status ? status = "read" : status = "unread";
    
    myLibrary.buildCard(myLibrary.add(new Book(bookName, author, yearPublished, status, pageCount, wordCount, isbn13, genre)));
    entries.forEach((element) => {
        element.value = "";
    })
    entries[7].checked = false;
    formContainer.toggle();
    e.preventDefault();
});

formClose.addEventListener("click", (e) => {
    formContainer.toggle();
})

newBookBtn.addEventListener("click", (e) => {
    formContainer.toggle();
});

// library code

let myLibrary = {
    books: [],
    add: function(bookObject) {
        if(this.books.includes(bookObject)) return;
        else { 
            this.books.push(bookObject); 
            bookObject.id = this.books.indexOf(bookObject); 
        }
        return bookObject.id;
    },
    buildCard: function(libraryIndex) {
        const card = template.content.cloneNode(true);
        card.querySelector("section").id = "_" + myLibrary.books[libraryIndex].id;
        let entry = card.querySelectorAll("p");
        entry[0].textContent = myLibrary.books[libraryIndex].name;
        if(myLibrary.books[libraryIndex].author != "") entry[1].querySelector("span").textContent = myLibrary.books[libraryIndex].author;
        else entry[1].querySelector("span").textContent = "Anonymous";
        if(myLibrary.books[libraryIndex].year != "") entry[2].querySelector("span").textContent = myLibrary.books[libraryIndex].year;
        else entry[2].querySelector("span").textContent = "Unknown";

        if(myLibrary.books[libraryIndex].wordCount == 0 && myLibrary.books[libraryIndex].pageCount > 0) {
            entry[3].querySelector("span").textContent = myLibrary.books[libraryIndex].pageCount + " pages";
        }
        else if(myLibrary.books[libraryIndex].pageCount == 0 && myLibrary.books[libraryIndex].wordCount > 0) {
            entry[3].querySelector("span").textContent = myLibrary.books[libraryIndex].wordCount + " words";
        }
        else if(myLibrary.books[libraryIndex].pageCount > 0 && myLibrary.books[libraryIndex].wordCount > 0) {
            entry[3].querySelector("span").textContent = myLibrary.books[libraryIndex].pageCount + " pages [" +
                                                         myLibrary.books[libraryIndex].wordCount + " words]";
        }
        else entry[3].querySelector("span").textContent = "Unknown";
        
        if(myLibrary.books[libraryIndex].isbn13 != "") entry[4].querySelector("span").textContent = myLibrary.books[libraryIndex].isbn13;
        else entry[4].querySelector("span").textContent = "Unspecified";

        if(myLibrary.books[libraryIndex].genre != "") entry[5].querySelector("span").textContent = myLibrary.books[libraryIndex].genre;
        else entry[5].querySelector("span").textContent = "fiction";

        entry[6].textContent = myLibrary.books[libraryIndex].status;
        myLibrary.books[libraryIndex].status === "unread" ? card.children[0].classList.add("unread") : card.children[0].classList.add("read");
        let closeButton = card.querySelector(".close-button");
        closeButton.addEventListener("click", (e) => {
            myLibrary.removeCard(libraryIndex);
        });
        let statusButton = card.querySelector(".status");
        statusButton.addEventListener("click", (e) => {
            myLibrary.changeStatus(libraryIndex);
        })
        container.appendChild(card);
    },
    removeCard: function(libraryIndex) {
        const identity = document.getElementById("_" + libraryIndex);
        container.removeChild(identity);
    },
    changeStatus: function(libraryIndex) {
        const identity = document.getElementById("_" + libraryIndex);
        const statusBtn = identity.querySelector(".status");
        statusBtn.textContent === "read" ? statusBtn.textContent = "unread" : statusBtn.textContent = "read";
        if(identity.classList.contains("read")) {
            identity.classList.replace("read", "unread");
        } else identity.classList.replace("unread", "read");
    }
};

class Book{
    constructor(bookName = "The Default Book", authorName = "Anonymous", yearPublished = "1973", status = "unread", pageCount = 0, wordCount = 0,
        isbn13 = "123-1234567890", genre = "unknown") {
            this.name = bookName;
            this.author = authorName;
            this.year = yearPublished;
            this.wordCount = wordCount;
            this.pageCount = pageCount;
            this.status = status;
            this.isbn13 = isbn13;
            this.genre = genre;
            this.id = undefined;
    }
}

myLibrary.buildCard(myLibrary.add(new Book("To Kill A Mockingbird", "Harper Lee", "1960", "unread", 281, 0, "978-0060935467", "literary fiction")));
myLibrary.buildCard(myLibrary.add(new Book("The Ingenious Gentleman Don Quixote of La Mancha", "Miguel de Cervantes", "", "read", 940, 345390, "978-0142437230", "satire")));