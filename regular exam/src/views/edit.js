import { editItem, getItemById } from "../data.js";
import { html } from "../lib.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${item.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${item.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            .value=${item.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            .value=${item.moreInfo}
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>`;

export async function editPage(ctx) {
  const item = await getItemById(ctx.params.id);
  ctx.render(editTemplate(item, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = formData.get('category').trim();
    const imageUrl = formData.get('image-url').trim();
    const description = formData.get('description').trim();
    const moreInfo = formData.get('additional-info').trim();
    if (category == '' || imageUrl == '' || description == '' || moreInfo == '') {
      return alert('All fields required');
    }
    await editItem(ctx.params.id, { category, imageUrl, description, moreInfo });
    ctx.updateNav();
    ctx.page.redirect('/details/' + ctx.params.id);
  }
}