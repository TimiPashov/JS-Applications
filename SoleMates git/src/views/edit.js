import { editItem, getItemById } from '../data.js';
import { html } from '../lib.js'

const editTemplate = (onSubmit, item) => html`
 <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input .value=${item.singer} type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input .value=${item.album} type="text" name="album" id="album-album" placeholder="Album" />
            <input .value=${item.imageUrl} type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input .value=${item.release} type="text" name="release" id="album-release" placeholder="Release date" />
            <input .value=${item.label} type="text" name="label" id="album-label" placeholder="Label" />
            <input .value=${item.sales} type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>`;

export async function editPage(ctx) {
    const item = await getItemById(ctx.params.id);
    ctx.render(editTemplate(onSubmit, item));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const singer = formData.get('singer').trim();
        const album = formData.get('album').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const release = formData.get('release').trim();
        const label = formData.get('label').trim();
        const sales = formData.get('sales').trim();

        if ([...formData.values()].some(x => x == '')) {
            return alert('All fields are required');
        }
        await editItem(ctx.params.id, { singer, album, imageUrl, release, label, sales });
        ctx.updateUserNav();
        ctx.page.redirect('/catalog');
    }
}