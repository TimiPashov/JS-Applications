import { page, render } from "../src/lib.js";
import { logout } from "./data.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
updateNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = (content)=> render(content, root);
    ctx.updateNav = updateNav;
    next();
}
async function onLogout(){
    await logout();
    updateNav();
    page.redirect('/');
}

function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}