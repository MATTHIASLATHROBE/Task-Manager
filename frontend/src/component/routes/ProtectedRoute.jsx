
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ authUser, authLoading }) => {

    // Wait until App.jsx finishes checking authentication
    if (authLoading) {
        return <p>Checking authentication...</p>
    }

    // Redirect unauthenticated users to login
    return authUser
        ? <Outlet />
        : <Navigate to="/login" replace />
}

export default ProtectedRoute
