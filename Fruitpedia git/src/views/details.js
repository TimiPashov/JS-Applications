
import { deleteItem, getItemById } from '../data.js';
import { html } from '../lib.js';


const detailsTemplate = (item, onDelete, isOwner) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-title">${item.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${item.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${item.nutrition}</p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${isOwner
            ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
            : null}
            
          </div>
            </div>
        </div>
      </section>`;

export async function detailsPage(ctx) {
  const item = await getItemById(ctx.params.id);
  let isOwner = false;
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  if (userData) {
    isOwner = item._ownerId == userData.id ? true : false;
  }

  ctx.render(detailsTemplate(item, onDelete, isOwner));

  async function onDelete() {
    await deleteItem(ctx.params.id);
    ctx.page.redirect('/catalog')
  }
}

