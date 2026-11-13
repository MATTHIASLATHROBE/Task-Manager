
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authServices'

const Navbar = ({ onLogoutSuccess }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Tasks', path: '/tasks' }
]

const handleLogout = async () => {
    try {
        setIsLoggingOut(true)
        setError("")

        await logoutUser()

        // Clear authentication and task state in App.jsx
        onLogoutSuccess()

        setMenuOpen(false)
        navigate('/login', { replace: true })

    } catch (error) {
        setError(error.message)
    } finally {
        setIsLoggingOut(false)
    }
}

    return (
        <nav className="bg-black text-white px-6 sm:px-8 py-5">

            <div className="flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    Task Manager
                </h1>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center gap-3">

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-green-700 text-white'
                                        : 'hover:bg-green-900 hover:text-white'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 disabled:opacity-50 transition-colors"
                    >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="sm:hidden text-2xl px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? '✕' : '☰'}
                </button>

            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="sm:hidden flex flex-col gap-2 mt-5 border-t border-gray-800 pt-4">

                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/'}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `w-full px-4 py-3 rounded-lg transition-colors ${
                                    isActive
                                        ? 'bg-green-700 text-white'
                                        : 'hover:bg-green-900 hover:text-white'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full text-left px-4 py-3 rounded-lg bg-red-700 hover:bg-red-800 disabled:opacity-50 transition-colors"
                    >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>

                </div>
            )}

            {error && (
                <p className="text-red-400 text-sm mt-3">
                    {error}
                </p>
            )}

        </nav>
    )
}

export default Navbar
