import { editItem, getItemById } from "../data.js";
import { html } from "../lib.js";
import { notify } from "../util.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit-meme">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value=${item.title}>
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value=${item.description}></textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${item.imageUrl}>
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>`;

export async function editPage(ctx) {
    const item = await getItemById(ctx.params.id);
    ctx.render(editTemplate(item, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        if (title == '' || description == '' || imageUrl == '') {
            return notify('All fields are required!');
        }
        await editItem(ctx.params.id, { title, description, imageUrl });
        ctx.page.redirect(`/details/${item._id}`);
    }
}