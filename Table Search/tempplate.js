import { html } from "./node_modules/lit-html/lit-html.js"

export const rowTemplate = (person) => html`
 <tr class="${person.matched ? 'select' : ''}">
    <td>${person.firstName} ${person.lastname}</td>
    <td>${person.email}</td>
    <td>${person.course}</td>
</tr>`