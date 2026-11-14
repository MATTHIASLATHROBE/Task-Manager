
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    getDashboardStats,
    getAllUsers
} from '../../services/adminService';

import {
    Users,
    ListTodo,
    CheckCircle2,
    Clock3,
    CalendarDays,
    ShieldCheck,
    Eye
} from 'lucide-react';

const AdminOverview = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsResponse, usersResponse] = await Promise.all([
                    getDashboardStats(),
                    getAllUsers()
                ]);

                setStats(statsResponse.stats);
                setUsers(usersResponse.users ?? []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        {
            title: 'Total Users',
            value: stats?.totalUsers ?? 0,
            icon: Users
        },
        {
            title: 'Total Tasks',
            value: stats?.totalTasks ?? 0,
            icon: ListTodo
        },
        {
            title: 'Completed Tasks',
            value: stats?.completedTasks ?? 0,
            icon: CheckCircle2
        },
        {
            title: 'Pending Tasks',
            value: stats?.pendingTasks ?? 0,
            icon: Clock3
        }
    ];

    if (loading) {
        return <p className="text-gray-400">Loading overview...</p>;
    }

    if (error) {
        return <p className="text-red-400">{error}</p>;
    }

    return (
        <div className="space-y-8">

            {/* Page Heading */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Admin Overview
                </h1>

                <p className="text-gray-400 mt-2">
                    Here's what's happening in your Task Manager.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {statCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="bg-[#151F2E] border border-[#1E293B] rounded-xl p-6"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        {card.title}
                                    </p>

                                    <h2 className="text-3xl font-bold text-white mt-3">
                                        {card.value}
                                    </h2>
                                </div>

                                <div className="bg-[#16A34A]/10 p-3 rounded-lg">
                                    <Icon
                                        size={25}
                                        className="text-[#16A34A]"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Registered Users Section */}
            <section
                id="users"
                className="bg-[#151F2E] border border-[#1E293B] rounded-xl p-5 sm:p-6"
            >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            Registered Users
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Manage and view registered accounts.
                        </p>
                    </div>

                    <div className="text-sm text-gray-400">
                        Total: <span className="text-white font-semibold">
                            {users.length}
                        </span>
                    </div>
                </div>

                {users.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                        No registered users found.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[750px] text-left">
                            <thead>
                                <tr className="border-b border-[#1E293B] text-gray-400 text-sm">
                                    <th className="py-4 px-3">User</th>
                                    <th className="py-4 px-3">Tasks</th>
                                    <th className="py-4 px-3">Role</th>
                                    <th className="py-4 px-3">Joined</th>
                                    <th className="py-4 px-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        onClick={() =>
                                            navigate(`/admin/users/${user._id}`)
                                        }
                                        className="border-b border-[#1E293B] hover:bg-[#1E293B]/50 cursor-pointer transition-colors"
                                    >
                                        <td className="py-4 px-3">
                                            <p className="text-white font-medium">
                                                {user.name}
                                            </p>

                                            <p className="text-gray-400 text-sm">
                                                {user.email}
                                            </p>
                                        </td>

                                        <td className="py-4 px-3 text-gray-300">
                                            {user.taskCount ?? 0}
                                        </td>

                                        <td className="py-4 px-3">
                                            <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                                                user.isAdmin
                                                    ? 'bg-purple-500/10 text-purple-400'
                                                    : 'bg-green-500/10 text-green-400'
                                            }`}>
                                                <ShieldCheck size={13} />
                                                {user.isAdmin ? 'Admin' : 'User'}
                                            </span>
                                        </td>

                                        <td className="py-4 px-3 text-gray-400 text-sm">
                                            <span className="inline-flex items-center gap-2">
                                                <CalendarDays size={15} />

                                                {user.createdAt
                                                    ? new Date(user.createdAt).toLocaleDateString()
                                                    : 'N/A'}
                                            </span>
                                        </td>

                                        <td className="py-4 px-3">
                                            <button
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    navigate(`/admin/users/${user._id}`);
                                                }}
                                                className="inline-flex items-center gap-2 text-[#16A34A] hover:text-green-400 text-sm font-medium"
                                            >
                                                <Eye size={16} />
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminOverview;
