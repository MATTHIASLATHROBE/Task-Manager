
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

// Profile dropdown is declared outside Navbar
const ProfileDropdown = ({
    authUser,
    onClose,
    onLogout,
    isLoggingOut
}) => {
    return (
        <div className="absolute right-0 top-full mt-3 w-60 rounded-xl border border-white/10 bg-zinc-950 shadow-2xl p-2 z-50">

            <div className="px-3 py-3 border-b border-white/10">
                <p className="text-sm font-semibold text-white">
                    {authUser?.name}
                </p>

                <p className="text-xs text-gray-400 mt-1 break-all">
                    {authUser?.email}
                </p>
            </div>

            <NavLink
                to="/profile"
                onClick={onClose}
                className="flex items-center px-3 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-emerald-400 rounded-lg transition-colors"
            >
                My Profile
            </NavLink>

            <button
                type="button"
                onClick={onLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 w-full px-3 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
            >
                <LogOut size={17} />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        </div>
    );
};


const Navbar = ({ authUser, onLogoutSuccess }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Get user's initials
    const userInitials = authUser?.name
        ?.trim()
        .split(' ')
        .filter(Boolean)
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'U';

    // Navigation links
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

    // Close every open menu
    const closeAllMenus = () => {
        setMenuOpen(false);
        setDesktopProfileOpen(false);
        setMobileProfileOpen(false);
    };

    // Logout handler
    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            setError('');

            await logoutUser();

            onLogoutSuccess?.();

            closeAllMenus();

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

                    {/* BRAND */}
                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-1 group"
                        onClick={closeAllMenus}
                    >
                        <span className="text-2xl sm:text-3xl font-black tracking-tight">
                            Task
                        </span>

                        <span className="text-2xl sm:text-3xl font-black tracking-tight text-green-600">
                            Manager
                        </span>

                        <span className="w-2 h-2 rounded-full bg-green-600 mt-5 ml-0.5 group-hover:shadow-[0_0_12px_#34d399] transition-all" />
                    </NavLink>


                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden sm:flex items-center gap-3">

                        {navLinks.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={closeAllMenus}
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


                        {/* DESKTOP PROFILE */}
                        <div className="relative ml-3">

                            <button
                                type="button"
                                onClick={() => {
                                    setDesktopProfileOpen(prev => !prev);
                                    setMobileProfileOpen(false);
                                    setMenuOpen(false);
                                }}
                                className="flex items-center gap-3 rounded-full border border-white/10 p-1.5 hover:bg-white/5 transition-all"
                                aria-label="Open profile menu"
                                aria-expanded={desktopProfileOpen}
                            >
                                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">
                                    {userInitials}
                                </div>

                                <span className="text-sm text-gray-300 pr-2">
                                    {authUser?.name || 'My Account'}
                                </span>
                            </button>

                            {desktopProfileOpen && (
                                <ProfileDropdown
                                    authUser={authUser}
                                    onClose={closeAllMenus}
                                    onLogout={handleLogout}
                                    isLoggingOut={isLoggingOut}
                                />
                            )}

                        </div>

                    </div>


                    {/* MOBILE PROFILE AND MENU BUTTONS */}
                    <div className="sm:hidden flex items-center gap-3">

                        {/* MOBILE PROFILE */}
                        <div className="relative">

                            <button
                                type="button"
                                onClick={() => {
                                    setMobileProfileOpen(prev => !prev);
                                    setDesktopProfileOpen(false);
                                    setMenuOpen(false);
                                }}
                                className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-sm"
                                aria-label="Open profile menu"
                                aria-expanded={mobileProfileOpen}
                            >
                                {userInitials}
                            </button>

                            {mobileProfileOpen && (
                                <ProfileDropdown
                                    authUser={authUser}
                                    onClose={closeAllMenus}
                                    onLogout={handleLogout}
                                    isLoggingOut={isLoggingOut}
                                />
                            )}

                        </div>


                        {/* MOBILE MENU BUTTON */}
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(prev => !prev);
                                setMobileProfileOpen(false);
                                setDesktopProfileOpen(false);
                            }}
                            className="flex items-center justify-center w-11 h-11 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/15 transition-all"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                        >
                            {menuOpen ? <X size={23} /> : <Menu size={23} />}
                        </button>

                    </div>

                </div>


                {/* MOBILE NAVIGATION */}
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

                                {navLinks.map(link => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={closeAllMenus}
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

                        </div>

                    </div>
                )}


                {/* ERROR MESSAGE */}
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
