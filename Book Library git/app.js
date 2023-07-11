import { render } from "./node_modules/lit-html/lit-html.js"
import { addBookTemplate, editBookTemplate, rowTemplate } from "./template.js";
import { createBook, deleteBook, editBook, getAllBooks } from "./utility.js";


const url = 'http://localhost:3030/jsonstore/collections/books/';
const rootTbody = document.querySelector('table tbody');
const main = document.querySelector('main')
const loadAllBooksBtn = document.getElementById('loadBooks');

loadAllBooksBtn.addEventListener('click', onLoadAllBooks)

start();

async function onSave(e) {
    e.preventDefault();
    const formElement = e.target.parentElement
    const id = formElement.querySelector('[name="id"]').value;
    const title = formElement.querySelector('[name="title"]').value.trim();
    const author = formElement.querySelector('[name="author"]').value.trim();

    if (title == '' || author == '') {
        alert('All fields required!');
        return;
    } else {
        editBook(url, id, { title, author });
        start();
    }
}

async function onEdit(e) {
    e.preventDefault();
    const trTarget = e.target.parentElement.parentElement
    const id = trTarget.id;
    const inputs = trTarget.querySelectorAll('td');
    const title = inputs[0].textContent;
    const author = inputs[1].textContent;

    render(editBookTemplate(onSave, title, author, id), main);
}


async function onCreate(e) {
    e.preventDefault();
    const form = e.target.parentElement;
    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const author = formData.get('author').trim();
    try {
        if (title == '' || author == '') {
            const err = new Error('All fields required');
            throw err
        } else {
            const newBook = { title, author };
            await createBook(url, newBook);
            form.reset();
            start();
        }
    } catch (err) {
        alert(err.message);
        throw err
    }
}

async function onLoadAllBooks() {
    
    start();
}

async function onDelete(e) {
    const id = e.target.parentElement.parentElement.id;
    await deleteBook(url, id);
    start();
}

async function start() {
    render(addBookTemplate(onCreate), main);
    const books = await getAllBooks(url);
    const booksArr = Object.entries(books);
    render(booksArr.map(x => rowTemplate(x, onDelete, onEdit)), rootTbody);

}