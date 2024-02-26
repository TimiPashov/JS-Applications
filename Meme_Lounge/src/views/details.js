import { deleteItem, getItemById } from "../data.js";
import { html } from "../lib.js";

const detailsTemplate = (item, userData, onDelete) => html`
<section id="meme-details">
            <h1>Meme Title: ${item.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${item.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${item.description}</p>
                    ${userData && userData.id == item._ownerId 
                    ?html`<a class="button warning" href="/edit/${item._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>`
                    :null}
                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->                                      
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx){
    const item = await getItemById(ctx.params.id);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    ctx.render(detailsTemplate(item, userData, onDelete));


    async function onDelete(){
        await deleteItem(ctx.params.id);
        ctx.page.redirect('/catalog');
    }
}