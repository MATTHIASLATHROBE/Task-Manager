
import { useState } from 'react';
import { NavLink} from 'react-router-dom';
import {
    LayoutDashboard,
    ListTodo,
    Menu,
    X,
    ArrowUpRight
} from 'lucide-react';

const Navbar = ({ authUser}) => {

    const [menuOpen, setMenuOpen] = useState(false);

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
                        <NavLink
                            to="/profile"
                            onClick={closeAllMenus}
                            className="flex items-center gap-3 rounded-full border border-white/10 p-1.5 hover:bg-white/5 transition-all"
                            aria-label="Go to profile"
                        >
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-black font-bold text-sm shrink-0">
                                {authUser?.profilePhoto ? (
                                    <img
                                        src={authUser.profilePhoto}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    userInitials
                                )}
                            </div>

                            <span className="text-sm text-gray-300 pr-2">
                                {authUser?.name || 'My Account'}
                            </span>
                        </NavLink>

                    </div>


                    {/* MOBILE PROFILE AND MENU BUTTONS */}
                    <div className="sm:hidden flex items-center gap-3">

                        {/* MOBILE PROFILE */}
                        <NavLink
                            to="/profile"
                            onClick={closeAllMenus}
                            className="w-10 h-10 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center text-black font-bold text-sm"
                            aria-label="Go to profile"
                        >
                            {authUser?.profilePhoto ? (
                                <img
                                    src={authUser.profilePhoto}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                userInitials
                            )}
                        </NavLink>


                        {/* MOBILE MENU BUTTON */}
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(prev => !prev);
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
            </div>

        </nav>
    );
};

export default Navbar;
