// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar_Usuario.jsx';
import '../../assets/css/Dashboard_Usuario.css'; 

const UserDashboard = () => {
    const [nombreUsuario, setNombreUsuario] = useState("Usuario");

    useEffect(() => {
        // Lógica de Source 6 transformada a React
        const datosUsuario = localStorage.getItem('user');
        if (datosUsuario) {
            const usuario = JSON.parse(datosUsuario);
            setNombreUsuario(usuario.full_name || "Usuario");
        }
        
        // Aplicamos la clase al body como estaba en tu HTML original
        document.body.className = "class_body";
        
        // Limpiamos la clase cuando el componente se desmonte
        return () => { document.body.className = ""; };
    }, []);

    return (
        <div>
            <Navbar />
            
            <main className="container-fluid">
                <section className="row mx-auto my-4">
                    <div className="col-12 text-center">
                        <h4 className="class_h4"> ¡Bienvenido/a, {nombreUsuario}! </h4>
                    </div>
                </section>

                {/* Contenedor vacío para futuro contenido */}
                <section className="row">
                    <div className="col-12">
                        {/* Aquí puedes ir agregando tus tarjetas y tablas más adelante */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;