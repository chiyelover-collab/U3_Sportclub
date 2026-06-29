const API_URL = 'http://localhost:3000/api/auth';


const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    return { ok: response.ok, data };
};


const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },   
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    return { ok: response.ok, data: data};
};


function getHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
}
export async function getPerfil() {
    const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: getHeaders()
    });
    if (!response.ok) throw new Error("Error al obtener perfil");
    return await response.json();
}

export async function updatePerfil(datos) {
    const response = await fetch(`${API_URL}/me`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(datos)
    });
    if (!response.ok) throw new Error("Error al guardar cambios");
    return await response.json();
}

export async function updatePassword(passwordData) {
    const response = await fetch(`${API_URL}/me/password`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(passwordData)
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.mensaje || "Contraseña actual incorrecta");
    }
    return true;
}

const AuthServices = {
    login,
    register,
    getPerfil,
    updatePerfil,
    updatePassword
};

export default AuthServices;