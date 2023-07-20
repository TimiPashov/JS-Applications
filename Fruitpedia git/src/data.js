import * as api from './api.js';



export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems(){
    return api.get('/data/fruits?sortBy=_createdOn%20desc')
}

export async function getItemById(id){
    return api.get('/data/fruits/' + id)
}

export async function createItem(item){
    return api.post('/data/fruits', item)
}

export async function deleteItem(id){
    return api.del('/data/fruits/' + id)
}

export async function editItem(id, movieData){
    return api.put('/data/fruits/' + id, movieData);
}
export async function getItemsBySearch(search){
    return api.get(`/data/fruits?where=name%20LIKE%20%22${search}%22`);
}