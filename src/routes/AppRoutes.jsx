import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import UserDashboard from "../pages/user/UserDashboard"
import CoachDashboard from "../pages/coach/CoachDashboard"
import AdminDashboard from "../pages/admin/AdminDashboard"
import UserLayout from "../layouts/UserLayout"
import CoachLayout from "../layouts/CoachLayout"
import AdminLayout from "../layouts/AdminLayout"
import ProtectedRoute from "./ProtectedRoutes"
import Register from "../pages/Register"
import ExitoRegister from "../pages/Exito_Register"
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/exito-register" element={<ExitoRegister />} />
                <Route element={<ProtectedRoute rolPermitido="user" />}>
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                </Route>
                <Route element={<ProtectedRoute rolPermitido="coach" />}>
                    <Route path="/coach/dashboard" element={<CoachDashboard />} />
                </Route>
                <Route element={<ProtectedRoute rolPermitido="admin" />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes