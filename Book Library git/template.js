import { html } from "./node_modules/lit-html/lit-html.js"

export const rowTemplate = (data, delFunc, editFunc) => html`
<tr id="${data[0]}">
    <td>${data[1].title}</td>
    <td>${data[1].author}</td>
    <td>
        <button @click="${editFunc}">Edit</button>
        <button @click="${delFunc}">Delete</button>
    </td>
</tr>
`;

export const addBookTemplate = (createFunc) => html`
 <form id="add-form">
        <h3>Add book</h3>
        <label>TITLE</label>
        <input type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input type="text" name="author" placeholder="Author...">
        <input @click="${createFunc}" type="submit" value="Submit">
    </form>
    `;

export const editBookTemplate = (editFunc, title, author, id) => html`
      <form id="edit-form" >
        <input .value ="${id}"type="hidden" name="id">
        <h3>Edit book</h3>
        <label>TITLE</label>
        <input .value="${title}" type="text" name="title" placeholder="Title...">
        <label>AUTHOR</label>
        <input .value=${author} type="text" name="author" placeholder="Author...">
        <input @click="${editFunc}" type="submit" value="Save">
    </form>`