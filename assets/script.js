
// dom code
const template = document.querySelector("#bookCard");
const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book");
const formContainer = document.querySelector("#form-container");
const formClose = document.querySelector("#formClose");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".submission");
formContainer.toggle = () => {
    (formContainer.style["display"] === "flex") ? formContainer.style["display"] = "none" : formContainer.style["display"] = "flex";
};

submitBtn.addEventListener("click", (e) => {
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
    },
    buildCard: function(libraryIndex) {
        const card = template.content.cloneNode(true);
        card.querySelector("section").id = "_" + myLibrary.books[libraryIndex].id;
        let entry = card.querySelectorAll("p");
        entry[0].textContent = myLibrary.books[libraryIndex].name;
        entry[1].querySelector("span").textContent = myLibrary.books[libraryIndex].author;
        entry[2].querySelector("span").textContent = myLibrary.books[libraryIndex].year;

        if(myLibrary.books[libraryIndex].wordCount == 0) {
            entry[3].querySelector("span").textContent = myLibrary.books[libraryIndex].pageCount + " pages";
        }
        else if(myLibrary.books[libraryIndex].pageCount == 0) {
            entry[3].querySelector("span").textContent = myLibrary.books[libraryIndex].wordCount + " words";
        }
        else if(myLibrary.books[libraryIndex].pageCount > 0 && myLibrary.books[libraryIndex].wordCount > 0) {
            entry[3].querySelector("span").textContent = myLibrary.books[libraryIndex].pageCount + " pages [" +
                                                         myLibrary.books[libraryIndex].wordCount + " words]";
        }
        else entry[3].querySelector("span").textContent = "Unknown";
        
        entry[4].querySelector("span").textContent = myLibrary.books[libraryIndex].isbn13;
        entry[5].querySelector("span").textContent = myLibrary.books[libraryIndex].genre;
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

function Book(bookName = "The Default Book", authorName = "boodac", yearPublished = "1973", status = "unread", pageCount = 0, wordCount = 0,
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

    if(wordCount > 0) {
        this.length = wordCount;
    } else if (pageCount > 0) {
        this.length = pageCount;
    } else this.length = -1;
}

const _Pride = new Book("Pride and Prejudice", "Jane Austen", "1813", "unread", 279, 0, "978-0144139518", "romance");
const _Kill = new Book("To Kill A Mockingbird", "Harper Lee", "1960", "unread", 0, 99121, "978-0060935467", "literary fiction");
const _Farm = new Book("Animal Farm", "George Orwell", "1945", "read", 92, 29966, "978-0452284241", "satire");
myLibrary.add(_Pride);
myLibrary.add(_Kill);
myLibrary.add(_Farm);

myLibrary.buildCard(0);
myLibrary.buildCard(1);
myLibrary.buildCard(2);