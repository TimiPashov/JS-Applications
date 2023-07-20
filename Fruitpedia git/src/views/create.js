
import { createItem } from '../data.js';
import { html } from '../lib.js';


const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>`;

export function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

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

    await createItem({name, imageUrl, description, nutrition});
    ctx.page.redirect('/catalog');
  }
}

