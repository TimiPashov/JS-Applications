import { getAllItems } from "../data.js";
import { html } from "../lib.js";

const catalogTemplate = (items) => html`
<h2>Fun Facts</h2>
        <section id="dashboard">
          ${items.length > 0 
          ? items.map(factCard)
          : html`<h2>No Fun Facts yet.</h2>`}               
        </section>`;

const factCard = (item) => html`
         <div class="fact">
            <img src=${item.imageUrl} alt="example1" />
            <h3 class="category">${item.category}</h3>
            <p class="description">${item.description}</p>
            <a class="details-btn" href="/details/${item._id}">More Info</a>
          </div>`;

export async function catalogPage(ctx) {
  const items = await getAllItems();
  ctx.render(catalogTemplate(items));
}