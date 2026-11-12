
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentUser } from '../../services/authServices'

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getCurrentUser()
                setIsAuthenticated(true)
            } catch {
                setIsAuthenticated(false)
            }
        }

        checkAuth()
    }, [])

    if (isAuthenticated === null) {
        return <p>Checking authentication...</p>
    }

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" replace />
}

export default ProtectedRoute
