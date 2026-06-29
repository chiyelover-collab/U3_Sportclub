
const API_URL = "http://localhost:3000/api/users"; 
const SPORTS_API_URL = "http://localhost:3000/api/sports";


function getToken() {
    return localStorage.getItem("token");
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
    };
}


export async function getUsers() {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: getHeaders(),
    });
    
    if (!response.ok) {
        throw new Error("Error al obtener la lista de usuarios");
    }
    return response.json();
}

export async function createUser(userData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.mensaje || data.message || "Error al crear usuario");
    }
    return data;
}

export async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.mensaje || data.message || "Error al actualizar usuario");
    }
    return data;
}

export async function deleteUser(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    
    if (!response.ok) {
        throw new Error("Error al eliminar usuario");
    }
    return true;
}

export async function getSports() {
    const response = await fetch(SPORTS_API_URL, {
        method: "GET",
        headers: getHeaders(),
    });
    
    if (!response.ok) {
        throw new Error("Error al obtener la lista de deportes");
    }
    return response.json();
}

export async function createSports(sportsData) {
    const response = await fetch(SPORTS_API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(sportsData),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.mensaje || data.message || "Error al crear deporte");
    }
    return data;
}

export async function updateSports(id, sportsData) {
    const response = await fetch(`${SPORTS_API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(sportsData),
    });
    
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.mensaje || data.message || "Error al actualizar deporte");
    }
    return data;
}

export async function deleteSports(id) {
    const response = await fetch(`${SPORTS_API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    
    if (!response.ok) {
        throw new Error("Error al eliminar deporte");
    }
    return true;
}