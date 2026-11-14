
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
    ArrowLeft,
    UserRound,
    Mail,
    ShieldCheck,
    CalendarDays,
    ListTodo,
    CheckCircle2,
    Clock3
} from 'lucide-react';

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

    // Fetch user information and tasks
const fetchUserData = useCallback(async (showLoading = false) => {
    try {
        if (showLoading) {
            setLoading(true);
        }

        setError('');

        const [userResponse, tasksResponse] = await Promise.all([
            getUserDetails(userId),
            getUserTasks(userId)
        ]);

        setUser(userResponse.user);
        setTasks(tasksResponse.tasks || []);
        setTaskCount(userResponse.taskCount ?? 0);

    } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.message || 'Failed to load user details.');

    } finally {
        if (showLoading) {
            setLoading(false);
        }
    }
}, [userId]);

    // Initial fetch and automatic updates
    useEffect(() => {
        const loadUserData = async () => {
            await fetchUserData(true);
        };

        loadUserData();

        const intervalId = setInterval(() => {
            fetchUserData();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [fetchUserData]);

    const handleBack = () => {
        navigate('/admin#users');
    };

    // Loading State
    if (loading) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <p className="text-slate-400">
                    Loading user details...
                </p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
                <p className="text-red-400">{error}</p>

                <button
                    onClick={handleBack}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#16A34A] hover:text-[#15803D]"
                >
                    <ArrowLeft size={16} />
                    Back to Users
                </button>
            </div>
        );
    }

    // User Not Found
    if (!user) {
        return (
            <div className="rounded-xl border border-[#1E293B] bg-[#151F2E] p-6">
                <p className="text-slate-400">
                    User not found.
                </p>

                <button
                    onClick={handleBack}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#16A34A] hover:text-[#15803D]"
                >
                    <ArrowLeft size={16} />
                    Back to Users
                </button>
            </div>
        );
    }

    const completedTasks = tasks.filter(task => task.done).length;
    const pendingTasks = tasks.filter(task => !task.done).length;

    // Task Statistics
    const statCards = [
        {
            title: 'Total Tasks',
            value: taskCount,
            description: 'All assigned tasks',
            icon: ListTodo
        },
        {
            title: 'Completed Tasks',
            value: completedTasks,
            description: 'Successfully completed',
            icon: CheckCircle2
        },
        {
            title: 'Pending Tasks',
            value: pendingTasks,
            description: 'Still in progress',
            icon: Clock3
        }
    ];

    return (
        <div className="space-y-8">

            {/* Page Heading */}
            <section>

                <button
                    onClick={handleBack}
                    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-[#16A34A]"
                >
                    <ArrowLeft size={17} />
                    Back to Users
                </button>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    User Details
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    View account information and task activity.
                </p>

            </section>

            {/* User Information */}
            <section className="rounded-xl border border-[#1E293B] bg-[#151F2E] p-5 sm:p-6">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#16A34A]/10">
                            <UserRound
                                size={25}
                                className="text-[#16A34A]"
                            />
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-xl font-semibold text-white">
                                {user.name}
                            </h2>

                            <p className="mt-1 flex items-center gap-2 break-all text-sm text-slate-400">
                                <Mail size={15} className="shrink-0" />
                                {user.email}
                            </p>
                        </div>

                    </div>

                    <span
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                            user.isAdmin
                                ? 'border-[#16A34A]/30 bg-[#16A34A]/15 text-[#16A34A]'
                                : 'border-[#1E293B] bg-[#1E293B]/60 text-slate-300'
                        }`}
                    >
                        <ShieldCheck size={14} />
                        {user.isAdmin ? 'Administrator' : 'Regular User'}
                    </span>

                </div>

                {/* Account Information */}
                <div className="mt-6 border-t border-[#1E293B] pt-5">

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Account Information
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                        <CalendarDays
                            size={16}
                            className="text-[#16A34A]"
                        />

                        <span>
                            Registered: {
                                user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : 'N/A'
                            }
                        </span>
                    </div>

                </div>

            </section>

            {/* Task Statistics */}
            <section>

                <div className="mb-5">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                        <ListTodo size={20} className="text-[#16A34A]" />
                        Task Statistics
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        Overview of this user's task activity.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    {statCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-xl border border-[#1E293B] bg-[#151F2E] p-5 transition-colors hover:border-slate-600"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-400">
                                        {card.title}
                                    </p>

                                    <Icon
                                        size={20}
                                        className="text-[#16A34A]"
                                    />
                                </div>

                                <h3 className="mt-3 text-3xl font-bold tabular-nums text-white">
                                    {card.value}
                                </h3>

                                <p className="mt-2 text-xs text-slate-500">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}

                </div>

            </section>

            {/* User Tasks */}
            <section>

                <div className="mb-5 flex items-center justify-between gap-3">

                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                            <ListTodo size={20} className="text-[#16A34A]" />
                            User Tasks
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            All tasks belonging to this account.
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full border border-[#1E293B] bg-[#151F2E] px-3 py-1.5 text-xs text-slate-300">
                        {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                    </span>

                </div>

                {tasks.length === 0 ? (

                    <div className="rounded-xl border border-[#1E293B] bg-[#151F2E] p-10 text-center">

                        <ListTodo
                            size={32}
                            className="mx-auto text-slate-500"
                        />

                        <h3 className="mt-3 font-medium text-white">
                            No tasks yet
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            This user hasn't created any tasks.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {tasks.map((task) => (

                            <div
                                key={task._id}
                                className="rounded-xl border border-[#1E293B] bg-[#151F2E] p-5 transition-colors hover:border-slate-600 sm:p-6"
                            >

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div className="min-w-0">

                                        <div className="flex items-center gap-3">

                                            <ListTodo
                                                size={18}
                                                className="shrink-0 text-[#16A34A]"
                                            />

                                            <h3 className="font-semibold text-white">
                                                {task.taskName}
                                            </h3>

                                        </div>

                                        {task.description && (
                                            <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                                {task.description}
                                            </p>
                                        )}

                                        {task.note && (
                                            <p className="mt-3 text-sm text-slate-500">
                                                Note: {task.note}
                                            </p>
                                        )}

                                    </div>

                                    <span
                                        className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                                            task.done
                                                ? 'border-[#16A34A]/30 bg-[#16A34A]/15 text-[#16A34A]'
                                                : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                                        }`}
                                    >
                                        {task.done ? (
                                            <CheckCircle2 size={14} />
                                        ) : (
                                            <Clock3 size={14} />
                                        )}

                                        {task.done ? 'Completed' : 'Pending'}
                                    </span>

                                </div>

                                {task.createdAt && (
                                    <div className="mt-5 border-t border-[#1E293B] pt-4">
                                        <p className="flex items-center gap-2 text-xs text-slate-500">
                                            <CalendarDays size={14} />
                                            Created: {
                                                new Date(task.createdAt).toLocaleDateString()
                                            }
                                        </p>
                                    </div>
                                )}

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
};

export default AdminUserDetails;
