// src/services/userService.js

const API_URL = "http://localhost:3000/api/users"; // Ajusta el puerto si tu backend usa otro

// Función auxiliar para obtener el token del localStorage
function getToken() {
    return localStorage.getItem("token");
}

// Función auxiliar para armar las cabeceras de la petición
function getHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
    };
}

// 1. Obtener todos los usuarios (GET)
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

// 2. Crear un nuevo usuario (POST)
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

// 3. Editar un usuario existente (PUT)
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

// 4. Eliminar un usuario (DELETE)
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