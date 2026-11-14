
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ListTodo,
    LogOut,
    Menu,
    X,
    ArrowUpRight
} from 'lucide-react';

import { logoutUser } from '../services/authServices';

const Navbar = ({ onLogoutSuccess }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const navLinks = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: LayoutDashboard
        },
        {
            name: 'My Tasks',
            path: '/tasks',
            icon: ListTodo
        }
    ];

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            setError('');

            await logoutUser();

            onLogoutSuccess?.();

            setMenuOpen(false);
            navigate('/login', { replace: true });

        } catch (error) {
            setError(error.message || 'Unable to log out.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <nav className="relative z-50 bg-black text-white border-b border-white/10">

            <div className="max-w-7xl mx-auto px-5 sm:px-8">

                <div className="flex justify-between items-center h-20">

                    {/* Text-based brand logo */}
                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-1 group"
                        onClick={() => setMenuOpen(false)}
                    >
                        <span className="text-2xl sm:text-3xl font-black tracking-tight">
                            Task
                        </span>

                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-green-600">
                            Manager
                        </span>

                        <span className="w-2 h-2 rounded-full bg-green-600 mt-5 ml-0.5 group-hover:shadow-[0_0_12px_#34d399] transition-all" />
                    </NavLink>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center gap-3">

                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                <link.icon size={17} />
                                {link.name}
                            </NavLink>
                        ))}

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="flex items-center gap-2 ml-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all disabled:opacity-50"
                        >
                            <LogOut size={17} />
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="sm:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/15 transition-all"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {menuOpen ? <X size={23} /> : <Menu size={23} />}
                    </button>

                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div
                        id="mobile-navigation"
                        className="sm:hidden pb-5 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-zinc-950 via-black to-emerald-950/40 p-3 shadow-2xl shadow-emerald-950/30">

                            <div className="px-3 pt-2 pb-3">
                                <p className="text-[10px] font-bold tracking-[0.25em] text-emerald-500 uppercase">
                                    Navigation
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Manage your workspace
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">

                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between w-full px-4 py-4 rounded-xl border transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                                    : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <span className="flex items-center gap-3">
                                                    <link.icon size={19} />
                                                    <span className="font-medium text-sm">
                                                        {link.name}
                                                    </span>
                                                </span>

                                                {isActive && (
                                                    <ArrowUpRight
                                                        size={17}
                                                        className="text-emerald-400"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                ))}

                            </div>

                            <div className="border-t border-white/10 my-3" />

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex items-center gap-3 w-full px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                            >
                                <LogOut size={19} />
                                <span className="font-medium text-sm">
                                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                                </span>
                            </button>

                        </div>
                    </div>
                )}

                {error && (
                    <p className="text-red-400 text-sm pb-3">
                        {error}
                    </p>
                )}

            </div>

        </nav>
    );
};

export default Navbar;
