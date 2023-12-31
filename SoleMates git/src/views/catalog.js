import { getAllItems } from '../data.js';
import { html } from '../lib.js'

const catalogTemplate = (items) => html`
 <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
          ${items.map(albumCard)}
        </ul>
        ${items.length == 0 ? html`<h2>There are no albums added yet.</h2>` : null}      
      </section>`;

const albumCard = (item) => html`
  <li class="card">
            <img src=${item.imageUrl} alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${item.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
          </li>`;

export async function catalogPage(ctx) {
  const items = await getAllItems();
  ctx.render(catalogTemplate(items));




}