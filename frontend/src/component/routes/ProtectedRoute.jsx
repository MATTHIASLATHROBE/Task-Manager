
import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';

const ProtectedRoute = ({ authUser, authLoading, allowedRole }) => {

    // Wait until authentication check is complete
 if (authLoading) {
    return <LoadingScreen />;
}

    // User must be logged in
    if (!authUser) {
        return <Navigate to="/login" replace />;
    }

    // Only admins can access admin routes
    if (allowedRole === 'admin' && !authUser.isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    // Admins cannot access regular user routes
    if (allowedRole === 'user' && authUser.isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
