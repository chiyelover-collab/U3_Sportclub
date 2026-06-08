import React, { useEffect, useState } from 'react';
import Navbar_Admin from '../../components/NavbarAdmin.jsx';
import '../../assets/css/DashboardAdmin.css'; 

const AdminDashboard = () => {
    // Por defecto dirá "Administrador"
    const [nombreUsuario, setNombreUsuario] = useState("Administrador");

    useEffect(() => {
        // Leemos el local storage para personalizar el saludo
        const datosUsuario = localStorage.getItem('user');
        if (datosUsuario) {
            const usuario = JSON.parse(datosUsuario);
            setNombreUsuario(usuario.full_name || "Administrador");
        }
        
        // Aplicamos el color de fondo para el Admin (#fdebb4)
        document.body.className = "class_body";
        
        // Limpiamos el fondo al salir de esta pantalla
        return () => { document.body.className = ""; };
    }, []);

    return (
        <div>
            <Navbar_Admin />
            
            <main className="container-fluid">
                <section className="row mx-auto my-4">
                    <div className="col-12 text-center">
                        <h4 className="class_h4"> ¡Bienvenido/a, {nombreUsuario}! </h4>
                    </div>
                </section>

                {/* Contenedor vacío donde irán tus 3 columnas (Gestión, Estadísticas, Clases) */}
                <section className="row">
                    <div className="col-12">
                        {/* Aquí insertaremos las tablas y gráficos más adelante */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;