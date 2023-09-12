let myLibrary = [];
const defaultBooks = [
  { title: "Lord of the Rings", author: "JRR Tolkien", pages: 320, read: true },
  { title: "Red Rising", author: "Pierce Brown", pages: 250, read: true },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 123, read: true },
  { title: "Lightbringer", author: "Pierce Brown", pages: 847, read: false },
  { title: "Of Mice and Men", author: "John Steinbeck", pages: 87, read: true },
];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
    //Give random id to book
    this.id = Math.floor(Math.random() * 1000);
  }

  static createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    return div.firstChild;
  }

  static addActionsListeners(parent) {
    parent.querySelector('ion-icon[name="trash-outline"]').addEventListener("click", (e) => library.deleteBook(e));
    parent.querySelector('ion-icon[name="checkbox-outline"]').addEventListener("click", (e) => library.toggleRead(e));
  }

  generateCard = () => {
    const cardString = `<div data-id="${this.id}" class="card">
          <h2>${this.title}</h2>
          <ul>
            <li><ion-icon name="pencil-outline"></ion-icon>Author: ${this.author}</li>
            <li><ion-icon name="book-outline"></ion-icon>Length: ${this.pages} Pages</li>
            <li>${this.read ? "Read ✅" : "Not read ❌"} </li>
          </ul>
          <div class="buttons">
            <ion-icon data-id="${this.id}" name="checkbox-outline"></ion-icon>
            <ion-icon data-id="${this.id}" name="trash-outline"></ion-icon>
          </div>
        </div>`;
    const cardHTML = Book.createElementFromHTML(cardString);
    Book.addActionsListeners(cardHTML);
    document.querySelector(".library").appendChild(cardHTML);
  };
  toggleReadStatus = () => {
    this.read = !this.read;
  };
}

class Library {
  constructor(books) {
    this.books = books.map((e) => new Book(e.title, e.author, e.pages, e.read));

    books.forEach((e) => this.addBookToLibrary(e.title, e.author, e.pages, e.read));
    document.querySelector(".modal button").addEventListener("click", this.submitBook);
    document.querySelector(".btn.fixed").addEventListener("click", () => {
      document.querySelector(".modal").classList.toggle("visible");
    });
  }

  addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
    newBook.generateCard();
  }

  deleteBook(e) {
    const id = e.target.getAttribute("data-id");
    document.querySelector(`.card[data-id="${id}"]`).remove();
    //Remove book from array
    this.books = this.books.filter((book) => book.id != id);
  }
  toggleRead(e) {
    const id = e.target.getAttribute("data-id");
    const book = this.books.find((e) => e.id == id);
    const bookIsRead = book.read;

    book.toggleReadStatus();

    //Update HTML
    const li = document.querySelector(`.card[data-id="${id}"] ul li:nth-child(3)`);
    if (bookIsRead) return (li.textContent = "Not read ❌");
    li.textContent = "Read ✅";
  }

  submitBook() {
    const values = {};
    document.querySelectorAll("input").forEach((e) => {
      values[e.id] = e.value;
      if (e.id === "read") values[e.id] = e.checked;
    });
    library.addBookToLibrary(values.title, values.author, values.length, values.read);
    return document.querySelector(".modal").classList.toggle("visible");
  }
}

const library = new Library(defaultBooks);
