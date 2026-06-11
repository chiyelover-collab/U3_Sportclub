import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ExitoRegister from "../pages/Exito_Register"

// Importar Layouts
import UserLayout from "../layouts/UserLayout"
import CoachLayout from "../layouts/CoachLayout"
import AdminLayout from "../layouts/AdminLayout"

// Importar Páginas
import UserDashboard from "../pages/user/UserDashboard"
import CoachDashboard from "../pages/coach/CoachDashboard"
import AdminDashboard from "../pages/admin/AdminDashboard"

// Importar Guardia
import ProtectedRoute from "./ProtectedRoutes"
import UsersPage from "../pages/admin/UsersPage.jsx";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/exito-register" element={<ExitoRegister />} />

                {/* Rutas Protegidas - USUARIO */}
                <Route element={<ProtectedRoute rolPermitido="user" />}>
                    <Route path="/user" element={<UserLayout />}>
                        {/* El Outlet del UserLayout mostrará este Dashboard en la ruta /user/dashboard */}
                        <Route path="dashboard" element={<UserDashboard />} />
                    </Route>
                </Route>

                {/* Rutas Protegidas - COACH */}
                <Route element={<ProtectedRoute rolPermitido="coach" />}>
                    <Route path="/coach" element={<CoachLayout />}>
                        <Route path="dashboard" element={<CoachDashboard />} />
                    </Route>
                </Route>

                {/* Rutas Protegidas - ADMIN */}
                <Route element={<ProtectedRoute rolPermitido="admin" />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="gestion" element={<UsersPage />} />
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes