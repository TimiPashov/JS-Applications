
import { logout } from "./data.js";
import { render, page } from "./lib.js";
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import {addLike} from './data.js'
window.addLike = addLike;

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/create',createPage);
page('/catalog', catalogPage);
page('/details/:id', detailsPage); 
page('/edit/:id', editPage); 
updateUserNav(); 
page.start()

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root);
    // ctx.setupNavbar = setupNavbar;
    ctx.updateUserNav = updateUserNav;
    next();
}

async function onLogout(){
   await logout();
    updateUserNav();
    page.redirect('/catalog');
}

function updateUserNav(){
    const userData = sessionStorage.getItem('userData');

    if(userData){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


// export function setupNavbar() {
//     const token = sessionStorage.getItem('authToken');
//     let template;
  
//     if (token) {
//       template = () => html`
//       <div>
//         <a href="/dashboard">Dashboard</a>
//         <a href="/search">Search</a>
//       </div>
//       <!-- Logged-in users -->
//       <div class="user">
//         <a href="/create">Add Pair</a>
//         <a @click=${logout}>Logout</a>
//       </div>
//       `;
  
      
//     } else {
//       template = () => html`
      
//             <div>
//               <a href="/dashboard">Dashboard</a>
//               <a href="/search">Search</a>
//             </div>
//               <!-- Guest users -->
//             <div class="guest">
//               <a href="/login">Login</a>
//               <a href="/register">Register</a>
//             </div>
//           `;
//     }
//     render(template(), document.querySelector('nav'));
//   }
//   setupNavbar();