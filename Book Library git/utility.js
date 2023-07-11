
export async function getAllBooks(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function deleteBook(url, id) {
    await fetch(url + id, {
        method: 'DELETE'
    })
}

export async function createBook(url, data) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export async function editBook(url, id, data) {
    await fetch(url + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}