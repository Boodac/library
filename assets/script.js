
// dom code
const template = document.querySelector("#bookCard");
const container = document.querySelector(".container");
const newBookBtn = document.querySelector(".new-book");
const formContainer = document.querySelector("#form-container");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".submission");
formContainer.toggle = () => {
    (formContainer.style["display"] === "flex") ? formContainer.style["display"] = "none" : formContainer.style["display"] = "flex";
};

submitBtn.addEventListener("click", (e) => {
    formContainer.toggle();
    e.preventDefault();
});

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
        let entry = card.querySelectorAll("p");
        entry[0].querySelector("span").textContent = myLibrary.books[libraryIndex].name;
        entry[1].querySelector("span").textContent = myLibrary.books[libraryIndex].author;
        entry[2].querySelector("span").textContent = myLibrary.books[libraryIndex].year;
        entry[3].querySelector("span").textContent = myLibrary.books[libraryIndex].wordCount;
        entry[4].querySelector("span").textContent = myLibrary.books[libraryIndex].pageCount;
        entry[5].querySelector("span").textContent = myLibrary.books[libraryIndex].isbn13;
        entry[6].querySelector("span").textContent = myLibrary.books[libraryIndex].genre;
        entry[7].textContent = myLibrary.books[libraryIndex].status;
        myLibrary.books[libraryIndex].status === "unread" ? card.children[0].classList.add("unread") : card.children[0].classList.add("read");
        container.appendChild(card);
    }    
};

function Book(bookName = "The Default Book", authorName = "boodac", yearPublished = "1973", status = "unread", pageCount = 0, wordCount = 0,
                isbn13 = 1231234567890, genre = "unknown") {
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

const _Pride = new Book("Pride and Prejudice", "Jane Austen", "1813", "unread", 279, 122204, 9780144139518, "romance");
const _Kill = new Book("To Kill A Mockingbird", "Harper Lee", "1960", "unread", 281, 99121, 9780060935467, "literary fiction");
const _Farm = new Book("Animal Farm", "George Orwell", "1945", "read", 92, 29966, 9780452284241, "satire");
myLibrary.add(_Pride);
myLibrary.add(_Kill);
myLibrary.add(_Farm);

myLibrary.buildCard(0);
myLibrary.buildCard(1);
myLibrary.buildCard(2);
myLibrary.buildCard(0);
myLibrary.buildCard(1);
myLibrary.buildCard(2);
myLibrary.buildCard(0);
myLibrary.buildCard(1);