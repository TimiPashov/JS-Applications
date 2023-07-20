
import { editItem, getItemById } from '../data.js';
import { html } from '../lib.js';


const editTemplate = (item, onSubmit) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value=${item.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value=${item.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${item.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${item.nutrition}
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>`;

export async function editPage(ctx) {
  const item = await getItemById(ctx.params.id);

  ctx.render(editTemplate(item, onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const imageUrl = formData.get('imageUrl').trim();
    const description = formData.get('description').trim();
    const nutrition = formData.get('nutrition').trim();

    if (name == '' || imageUrl == '' || description == '' || nutrition == '') {
      return alert('All fields required!');
    }

    await editItem(ctx.params.id, { name, imageUrl, description, nutrition });
    ctx.page.redirect('/catalog');
  }
}

