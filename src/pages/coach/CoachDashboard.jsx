// src/pages/coach/CoachDashboard.jsx
import React, { useEffect, useState } from 'react';
import Navbar_Coach from '../../components/NavbarCoach.jsx';
import '../../assets/css/DashboardCoach.css'; 

const CoachDashboard = () => {
    // Por defecto dirá "Entrenador" si no encuentra un nombre
    const [nombreUsuario, setNombreUsuario] = useState("Entrenador");

    useEffect(() => {
        // Recuperamos los datos del usuario logueado
        const datosUsuario = localStorage.getItem('user');
        if (datosUsuario) {
            const usuario = JSON.parse(datosUsuario);
            setNombreUsuario(usuario.full_name || "Entrenador");
        }
        
        // Aplicamos la clase al body para el fondo lila claro (#e4daf1)
        document.body.className = "class_body";
        
        // Limpiamos la clase cuando salgamos de la página
        return () => { document.body.className = ""; };
    }, []);

    return (
        <div>
            <Navbar_Coach />
            
            <main className="container-fluid">
                <section className="row mx-auto my-4">
                    <div className="col-12 text-center">
                        <h4 className="class_h4 class_title2"> ¡Bienvenido, Entrenador {nombreUsuario}! </h4>
                    </div>
                </section>

                {/* Contenedor vacío donde luego irán las cards de "Mis Alumnos" y "Horario" */}
                <section className="row">
                    <div className="col-12">
                        {/* El contenido se insertará aquí */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CoachDashboard;