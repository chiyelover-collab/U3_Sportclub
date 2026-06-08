// src/components/Navbar_Admin.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/imagenes/logo_empresa_letra_v1.png'; // Asegúrate de la ruta

const Navbar_Admin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            {/* Header con el truco de 3 columnas para el centrado perfecto */}
            <header className="class_header container-fluid py-2">
                <div className="class_div_logo row align-items-center">
                    <div className="col-4 text-start">
                        <img src={logo} alt="logo" className="class_logo class_img_logo" />
                    </div>
                    <div className="col-4 text-center">
                        <h2 className="class_h1 m-0"> Dashboard Administrador </h2>
                    </div>
                    <div className="col-4"></div> {/* Contrapeso */}
                </div>
            </header>

            {/* Barra de Navegación del Admin */}
            <nav className="navbar navbar-expand-lg class_navbar navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDashboardAdmin">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarDashboardAdmin">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link class_a1" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                {/* Asumiendo que tendrás una ruta para gestionar usuarios */}
                                <Link className="nav-link class_a1" to="/admin/gestion">Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link class_a1" href="#">Reportes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link class_a1" href="#">Configuración</a>
                            </li>
                        </ul>
                        {/* En React usamos un div en lugar de form para agrupar botones si no envían datos */}
                        <div className="d-flex ms-auto gap-2">
                            <button onClick={() => navigate("/edit-profile-admin")} className="btn btn-primary" type="button">
                                Editar Perfil
                            </button>
                            <button onClick={handleLogout} className="btn btn-danger" type="button">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar_Admin;