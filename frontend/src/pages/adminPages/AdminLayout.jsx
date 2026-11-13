import { NavLink, Outlet } from 'react-router-dom';
import {LayoutDashboard,Users,Settings} from 'lucide-react';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex">

            {/* Sidebar */}
            <aside className="w-64 shrink-0 bg-slate-900 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">
                    Task Manager
                </h1>

                <nav className="flex flex-col gap-3">

                {/* Replace the Overview link here */}
                <NavLink
                    to="/admin/users"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                            isActive
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-slate-800 text-slate-300'
                        }`
                    }
                >
                    <LayoutDashboard size={20} />
                    <span>Overview</span>
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                            isActive
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-slate-800 text-slate-300'
                        }`
                    }
                >
                    <Users size={20} />
                    <span>Users</span>
                </NavLink>

                <NavLink
                    to="/admin/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                            isActive
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-slate-800 text-slate-300'
                        }`
                    }
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </NavLink>

                {/* Keep your existing Settings link here */}

            </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;