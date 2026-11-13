
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllUsers, getDashboardStats } from '../../services/adminService';

const AdminUsers = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0
    });

    // Fetch all registered users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError('');

                const [usersResponse, statsResponse] = await Promise.all([
                    getAllUsers(),
                    getDashboardStats()
                ]);

                setUsers(usersResponse.users);
                setStats(statsResponse.stats);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Navigate to the selected user's details page
    const handleUserClick = (userId) => {
        navigate(`/admin/users/${userId}`);
    };

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-2">
                Admin Dashboard
            </h1>

            <p className="text-gray-500 mb-6">
                Manage registered users
            </p>

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    <div className="border rounded-lg p-4">
                        <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
                        <p>Total Users</p>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h2 className="text-2xl font-bold">{stats.totalTasks}</h2>
                        <p>Total Tasks</p>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h2 className="text-2xl font-bold text-green-600">
                            {stats.completedTasks}
                        </h2>
                        <p>Completed Tasks</p>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h2 className="text-2xl font-bold text-orange-500">
                            {stats.pendingTasks}
                        </h2>
                        <p>Pending Tasks</p>
                    </div>

                </div>
            )}

            {/* Loading State */}
            {loading && (
                <p>Loading users...</p>
            )}

            {/* Error State */}
            {error && (
                <p className="text-red-500">
                    {error}
                </p>
            )}

            {/* Users List */}
            {!loading && !error && (
                <div className="space-y-3">

                    {users.length === 0 ? (
                        <p>No registered users found.</p>
                    ) : (
                        users.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => handleUserClick(user._id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === 'Enter' ||
                                        event.key === ' '
                                    ) {
                                        event.preventDefault();
                                        handleUserClick(user._id);
                                    }
                                }}
                                className="cursor-pointer border rounded-lg p-4 hover:bg-gray-100 transition"
                            >
                                <h3 className="font-semibold text-lg">
                                    {user.name}
                                </h3>

                                <p className="text-gray-600">
                                    {user.email}
                                </p>

                                <p className="text-sm mt-2">
                                    Role: {user.isAdmin ? 'Admin' : 'User'}
                                </p>

                                <p className="text-sm text-blue-600 mt-2">
                                    View user details →
                                </p>
                            </div>
                        ))
                    )}

                </div>
            )}

        </div>
    );
};

export default AdminUsers;
