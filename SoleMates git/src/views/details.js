import { addLike, deleteItem, getItemById, getLikesByUserId, getTotalLikesByItemId } from '../data.js';
import { html } from '../lib.js'

const detailsTemplate = (item, userData, isOwner, onDelete, onLike, likesCount, hasUserLiked) => html`
 <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${item.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${item.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${likesCount}</span></div>

          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${userData && !isOwner && !hasUserLiked
    ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
    : null}           
            ${isOwner
    ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
                       <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
    : null}           
          </div>
        </div>
      </section>`;

export async function detailsPage(ctx) {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [item, likesCount, hasUserLiked] = await Promise.all([
    getItemById(ctx.params.id),
    getTotalLikesByItemId(ctx.params.id),
    getLikesByUserId(ctx.params.id, userData.id)
  ]);
  console.log(likesCount);
  console.log(hasUserLiked);
  let isOwner = false;
  if (userData) {
    isOwner = userData.id == item._ownerId;
  }

  ctx.render(detailsTemplate(item, userData, isOwner, onDelete, onLike, likesCount, hasUserLiked));

  async function onDelete() {
    const choice = confirm('Are you sure?');
    if (choice) {
      await deleteItem(ctx.params.id);
      ctx.page.redirect('/catalog');
    }
  }

  async function onLike() {
    await addLike({ albumId: ctx.params.id });
    ctx.page.redirect('/details/' + ctx.params.id)
  }
}