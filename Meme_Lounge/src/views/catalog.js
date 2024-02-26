import { getAllItems } from "../data.js";
import { html } from "../lib.js";

const catalogTemplate = (items) => html`
<section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
				<!-- Display : All memes in database ( If any ) -->
                ${items.length > 0 ? items.map(memeCard): html`<p class="no-memes">No memes in database.</p>`}               							
			</div>
        </section>`;

const memeCard = (item)=> html`
<div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${item.title}</p>
                            <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${item._id}">Details</a>
                        </div>
                    </div>
                </div>`;        

export async function catalogPage(ctx){
    const items = await getAllItems();
    ctx.render(catalogTemplate(items));
}