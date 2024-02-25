import * as api from './api.js';



export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems() {
    return api.get('/data/facts?sortBy=_createdOn%20desc')
}

export async function getItemById(id) {
    return api.get('/data/facts/' + id)
}

export async function addLike(factId) {
    return api.post('/data/likes', factId);
}

export async function getLikesCount(factId){
    return api.get(`/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`);
}
export async function getHasLiked(factId, userId){
    return api.get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function createItem(item) {
    return api.post('/data/facts', item)
}

export async function deleteItem(id) {
    return api.del('/data/facts/' + id);
}

export async function editItem(id, itemData) {
    return api.put('/data/facts/' + id, itemData);
}
export async function getItemsBySearch(search) {
    return api.get(`/data/fruits?where=name%20LIKE%20%22${search}%22`);
}