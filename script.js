let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  this.id = Math.floor(Math.random() * 1000);
}

const generateCard = (book) => {
  const cardString = `<div data-id="${book.id}" class="card">
          <h2>${book.title}</h2>
          <ul>
            <li><ion-icon name="pencil-outline"></ion-icon>Author: ${book.author}</li>
            <li><ion-icon name="book-outline"></ion-icon>Length: ${book.pages} Pages</li>
            <li>${book.read ? "Read" : "Not read"} </li>
          </ul>
          <div class="buttons">
            <ion-icon data-id="${book.id}" name="checkbox-outline"></ion-icon>
            <ion-icon data-id="${book.id}" name="trash-outline"></ion-icon>
          </div>
        </div>`;
  document.querySelector(".library").innerHTML += cardString;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  generateCard(newBook);
}

const deleteBook = function (e) {
  const id = this.getAttribute("data-id");
  document.querySelector(`.card[data-id="${id}"]`).remove();
  myLibrary = myLibrary.filter((book) => book.id != id);
};

document.querySelector(".btn.fixed").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("visible");
});

const { title, author, pages, read } = { title: "Lord of the Rings", author: "JRR Tolkien", pages: 320, read: true };
addBookToLibrary(title, author, pages, read);

document.querySelectorAll('ion-icon[name="trash-outline"]').forEach((e) => e.addEventListener("click", deleteBook));
