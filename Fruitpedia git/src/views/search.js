
import { getItemsBySearch } from '../data.js';
import { html } from '../lib.js';


const searchTemplate = (onSearch, items) => html`
<section id="search">

<div class="form">
  <h2>Search</h2>
  <form @submit=${onSearch} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
  <div class="search-result">
    ${items && items.length != 0 ? items.map(fruitCard) : html`<p class="no-result">No result.</p>`}
 
  <!--If there are matches display a div with information about every fruit-->

  </div>
        </section>`;

const fruitCard = (item) => html`
 <div class="fruit">
  <img src=${item.imageUrl} alt="example1" />
  <h3 class="title">${item.name}</h3>
  <p class="description">${item.description}</p>
  <a class="details-btn" href="/details/${item._id}">More Info</a>
</div>`

export function searchPage(ctx) {
  let initialLoad = true;
  ctx.render(searchTemplate(onSearch));

  async function onSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search').trim();
    if (search != '') {
      const items = await getItemsBySearch(search);
      initialLoad = false;
      ctx.render(searchTemplate(onSearch, items))
    }
  }
}

