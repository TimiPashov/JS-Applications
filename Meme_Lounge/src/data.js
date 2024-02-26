import * as api from './api.js';



export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllItems(){
    return api.get('/data/memes?sortBy=_createdOn%20desc')
}

export async function getItemById(id){
    return api.get('/data/memes/' + id)
}

export async function createItem(item){
    return api.post('/data/memes', item)
}

export async function deleteItem(id){
    return api.del('/data/memes/' + id)
}

export async function editItem(id, movieData){
    return api.put('/data/memes/' + id, movieData);
}
export async function getMemesByUserId(userId){
    return api.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
// export async function getItemsBySearch(search){
//     return api.get(`/data/fruits?where=name%20LIKE%20%22${search}%22`);
// }
// export async function getGoingsById(eventId){
//     return api.get(`/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`);
// }
// export async function goToEvent(item){
//     return api.post('/data/going', item)
// }
// export async function isGoingToEvent(eventId, userId){
//     return api.get(`/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
// }
