
import { getAllItems } from '../data.js';
import { html } from '../lib.js';


const catalogTemplate = (items) => html`
 <section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${items.length != 0
          ? items.map(fruitCard)
          : html`<p>No fruit info yet.</p>`}             
        </section>`;

const fruitCard = (item) => html`
<div class="fruit">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="title">${item.name}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
          </div>`

export async function catalogPage(ctx) {
  const items = await getAllItems();
  ctx.render(catalogTemplate(items));
}

