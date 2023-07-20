import * as api from './api.js';



export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems() {
    return api.get('/data/albums?sortBy=_createdOn%20desc');
}

export async function getItemById(id) {
    return api.get('/data/albums/' + id);
}

export async function getTotalLikesByItemId(albumId) {
    return api.get(`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export async function getLikesByUserId(albumId, userId) {
    return api.get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function createItem(item) {
    return api.post('/data/albums', item);
}

export async function deleteItem(id) {
    return api.del('/data/albums/' + id);
}

export async function editItem(id, movieData) {
    return api.put('/data/albums/' + id, movieData);
}

export async function addLike(albumId) {
    return api.post('/data/likes', albumId);
}