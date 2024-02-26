import { logout } from "./data.js";
import { page, render } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { profilePage } from "./views/profile.js";
import { registerPage } from "./views/register.js";


const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/profile', profilePage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
updateUserNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = (content)=> render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}
async function onLogout(){
    await logout();
    updateUserNav();
    page.redirect('/');
}
function updateUserNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;
        page.redirect('/catalog');
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}
