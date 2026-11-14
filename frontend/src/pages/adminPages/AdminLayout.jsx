
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    Menu,
    X,
    LogOut
} from 'lucide-react';

const AdminLayout = ({ onLogoutSuccess }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-dvh flex bg-[#0B1220]">

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 h-dvh w-64 shrink-0 bg-[#151F2E] text-white p-6 flex flex-col transform transition-transform duration-300 md:static md:translate-x-0 ${
                    isSidebarOpen
                        ? 'translate-x-0'
                        : '-translate-x-full'
                }`}
            >
                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden mb-4 ml-auto block text-white"
                >
                    <X size={24} />
                </button>

                {/* Logo */}
                <h1 className="text-2xl font-bold mb-10 tracking-tight">
                    Task <span className="text-[#16A34A]">Manager</span>
                </h1>

                {/* Navigation */}
              <nav className="flex flex-col gap-3 flex-1">

                    {/* Overview */}
                    <NavLink
                        to="/admin"
                        end
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                                isActive
                                    ? 'bg-[#16A34A]/15 text-[#16A34A]'
                                    : 'text-slate-400 hover:bg-[#1E293B] hover:text-white'
                            }`
                        }
                    >
                        <LayoutDashboard size={18} />
                        Overview
                    </NavLink>

                    {/* Settings */}
                    <NavLink
                        to="/admin/settings"
                        onClick={() => setIsSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                                isActive
                                    ? 'bg-[#16A34A]/15 text-[#16A34A]'
                                    : 'text-slate-400 hover:bg-[#1E293B] hover:text-white'
                            }`
                        }
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </NavLink>

                </nav>
                {/* Logout Button */}
                <button
                    onClick={onLogoutSuccess}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 mt-auto w-full text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-[#0B1220] text-white p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">

                <Outlet />

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="fixed bottom-4 left-4 z-30 md:hidden p-3 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg"
                >
                    <Menu size={24} />
                </button>

            </main>

        </div>
    );
};

export default AdminLayout;
