import { addLike, deleteItem, getHasLiked, getItemById, getLikesCount } from "../data.js";
import { html } from "../lib.js";

const detailsTemplate = (item, onDelete, userData, onLike, likes, hasLiked) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${item.imageUrl} alt="example1" />
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${item.description}</p>
                   <p id ="more-info">${item.moreInfo}</p>
              </div>

              <h3>Likes:<span id="likes">${likes}</span></h3>
          <div id="action-buttons">
            ${userData && userData.id == item._ownerId
    ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
    : null}
            ${userData && userData.id != item._ownerId && hasLiked == 0
    ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
    : null}

             
            

          </div>
            </div>
        </div>
      </section>`;

export async function detailsPage(ctx) {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [item, likes, hasLiked] = await Promise.all([
    getItemById(ctx.params.id),
    getLikesCount(ctx.params.id),
    getHasLiked(ctx.params.id, userData? userData.id : null)
  ])
  ctx.render(detailsTemplate(item, onDelete, userData, onLike, likes, hasLiked));

  async function onDelete() {
    const choice = confirm('Are you sure?');
    if (choice) {
      await deleteItem(ctx.params.id);
      ctx.page.redirect('/catalog');
    }
  }
  async function onLike() {
    await addLike({ factId: ctx.params.id });
    ctx.page.redirect('/details/' + ctx.params.id);
  }
}