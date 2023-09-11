let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  //Give random id to book
  this.id = Math.floor(Math.random() * 1000);
}

function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  return div.firstChild;
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
  const cardHTML = createElementFromHTML(cardString);
  cardHTML.querySelector('ion-icon[name="trash-outline"]').addEventListener("click", deleteBook);
  cardHTML.querySelector('ion-icon[name="checkbox-outline"]').addEventListener("click", toggleRead);
  document.querySelector(".library").appendChild(cardHTML);
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  generateCard(newBook);
}

const deleteBook = function (e) {
  const id = this.getAttribute("data-id");
  document.querySelector(`.card[data-id="${id}"]`).remove();
  //Remove book from array
  myLibrary = myLibrary.filter((book) => book.id != id);
};

const toggleRead = function (e) {
  const id = this.getAttribute("data-id");
  const bookIsRead = myLibrary.find((e) => e.id == id).read;
  const bookIndex = myLibrary.findIndex((e) => e.id == id);

  //Update myLibrary Arr
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read;

  //Update HTML
  const li = document.querySelector(`.card[data-id="${id}"] ul li:nth-child(3)`);
  if (bookIsRead) return (li.textContent = "Not read");
  li.textContent = "Read";
};

const submitBook = function (e) {
  const values = {};
  document.querySelectorAll("input").forEach((e) => {
    values[e.id] = e.value;
    if (e.id === "read") values[e.id] = e.checked;
  });
  addBookToLibrary(values.title, values.author, values.length, values.read);
  return document.querySelector(".modal").classList.toggle("visible");
};

document.querySelector(".btn.fixed").addEventListener("click", () => {
  document.querySelector(".modal").classList.toggle("visible");
});

const { title, author, pages, read } = { title: "Lord of the Rings", author: "JRR Tolkien", pages: 320, read: true };
addBookToLibrary(title, author, pages, read);

document.querySelector(".modal button").addEventListener("click", submitBook);
