
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
    getUserDetails,
    getUserTasks
} from '../../services/adminService';

const AdminUserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskCount, setTaskCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError('');

                const [userResponse, tasksResponse] = await Promise.all([
                    getUserDetails(userId),
                    getUserTasks(userId)
                ]);

                setUser(userResponse.user);
                setTasks(tasksResponse.tasks);
                setTaskCount(userResponse.taskCount);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!user) {
        return <p>User not found.</p>;
    }

    const completedTasks = tasks.filter(task => task.done).length;
    const pendingTasks = tasks.filter(task => !task.done).length;

    return (
        <div className="p-6">

            <button
                onClick={() => navigate('/admin/users')}
                className="mb-6 text-blue-600 hover:underline"
            >
                ← Back to Users
            </button>

            <h1 className="text-2xl font-bold mb-6">
                User Details
            </h1>

            {/* User Information */}
            <div className="border rounded-lg p-5 mb-6">
                <h2 className="text-xl font-semibold">
                    {user.name}
                </h2>

                <p className="text-gray-600">
                    {user.email}
                </p>

                <p className="mt-3">
                    Role: {user.isAdmin ? 'Admin' : 'User'}
                </p>

                <p>
                    Registered: {
                        new Date(user.createdAt).toLocaleDateString()
                    }
                </p>
            </div>

            {/* Task Statistics */}
            <h2 className="text-xl font-semibold mb-4">
                Task Statistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                <div className="border rounded-lg p-4">
                    <h3 className="text-2xl font-bold">
                        {taskCount}
                    </h3>
                    <p>Total Tasks</p>
                </div>

                <div className="border rounded-lg p-4">
                    <h3 className="text-2xl font-bold text-green-600">
                        {completedTasks}
                    </h3>
                    <p>Completed Tasks</p>
                </div>

                <div className="border rounded-lg p-4">
                    <h3 className="text-2xl font-bold text-orange-500">
                        {pendingTasks}
                    </h3>
                    <p>Pending Tasks</p>
                </div>

            </div>

            {/* User Tasks */}
            <h2 className="text-xl font-semibold mb-4">
                User Tasks
            </h2>

            {tasks.length === 0 ? (
                <p>This user has no tasks yet.</p>
            ) : (
                <div className="space-y-3">
                    {tasks.map(task => (
                        <div
                            key={task._id}
                            className="border rounded-lg p-4"
                        >
                            <h3 className="font-semibold">
                                {task.taskName}
                            </h3>

                            <p className="text-gray-600">
                                {task.description}
                            </p>

                            <p className={
                                task.done
                                    ? 'text-green-600'
                                    : 'text-orange-500'
                            }>
                                {task.done ? 'Completed' : 'Pending'}
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default AdminUserDetails;
