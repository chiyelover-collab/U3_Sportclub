import { Navigate, Outlet } from "react-router-dom";

// Este es nuestro guardia. Recibe una instrucción (rolPermitido): "¿Quién puede pasar por esta puerta?"
const ProtectedRoute = ({ rolPermitido }) => {
    
    // 1. El guardia revisa el navegador del usuario buscando la "llave" (el token)
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    // 2. Si no hay llave o no hay datos, ¡pa' fuera! Lo mandamos a la recepción (Login)
    if (!token || !userString) {
        return <Navigate to="/login" replace />;
    }

    // 3. Si tiene llave, el guardia revisa si su rol coincide con la sala a la que intenta entrar
    const user = JSON.parse(userString);
    const rolActual = user.role.toLowerCase().trim();

    if (rolPermitido && rolActual !== rolPermitido) {
        // Si un usuario normal intenta entrar a la sala del admin, lo devolvemos a la página principal
        return <Navigate to="/" replace />; 
    }

    // 4. Si todo está en orden, el guardia le abre la puerta
    // (<Outlet /> es la forma en que React dice "muestra la pantalla que el usuario pidió")
    return <Outlet />;
};

export default ProtectedRoute;