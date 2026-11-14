
import { Link, useNavigate } from 'react-router-dom';
import {
    Plus,
    ArrowRight,
    ListTodo,
    Clock3,
    CheckCircle2
} from 'lucide-react';

import TaskList from '../component/TaskList';
import TaskStats from '../component/TaskStats';

const Dashboard = ({
    authUser,
    tasks,
    loading,
    fetchError,
    actionError,
    totalTasks,
    completedTasks,
    pendingTasks,
    toggleTask,
    deleteTask
}) => {

    const navigate = useNavigate();

    const openTask = (taskId) => {
        navigate(`/tasks/${taskId}`);
    };

    const userName = authUser?.name?.trim()?.split(' ')[0] || 'there';

    return (
        <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 md:px-12">

            <div className="max-w-6xl mx-auto">

                {/* Dashboard Header */}
                <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

                    <div>
                        <p className="text-sm text-green-400 font-medium mb-2">
                            YOUR WORKSPACE
                        </p>

                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Welcome back, {userName}
                        </h1>

                        <p className="text-gray-400 mt-2 text-sm sm:text-base">
                            Here's an overview of how your tasks are progressing.
                        </p>
                    </div>

                    <Link
                        to="/tasks"
                        className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-3 rounded-lg text-sm font-medium"
                    >
                        View All Tasks
                        <ArrowRight size={17} />
                    </Link>

                </section>

                {/* Statistics */}
                <section className="mb-10">
                    <TaskStats
                        totalTasks={totalTasks}
                        completedTasks={completedTasks}
                        pendingTasks={pendingTasks}
                    />
                </section>

                {/* Create Task Action */}
                <section className="mb-8">

                    <button
                        type="button"
                        onClick={() => navigate('/tasks', {
                            state: { openCreateForm: true }
                        })}
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-3 rounded-lg font-medium text-sm"
                    >
                        <Plus size={18} />
                        Create New Task
                    </button>

                </section>

                {/* Recent Tasks */}
                <section className="bg-gray-900/70 border border-gray-800 rounded-xl p-5 sm:p-6">

                    <div className="flex items-center justify-between mb-6">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <ListTodo size={20} className="text-green-400" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">
                                    Recent Tasks
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    Your latest activity
                                </p>
                            </div>
                        </div>

                        <span className="text-sm text-gray-400">
                            {totalTasks} tasks
                        </span>

                    </div>

                    {/* Action Error */}
                    {actionError && (
                        <p className="text-red-400 text-sm mb-4">
                            {actionError}
                        </p>
                    )}

                    {/* Task List States */}
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 text-gray-400 py-10">
                            <Clock3 size={17} />
                            <p>Loading your tasks...</p>
                        </div>
                    ) : fetchError ? (
                        <p className="text-red-400 text-center py-8">
                            {fetchError}
                        </p>
                    ) : tasks.length > 0 ? (
                        <TaskList
                            tasks={tasks}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            clickable={true}
                            onTaskClick={openTask}
                        />
                    ) : (
                        <div className="text-center py-10">
                            <CheckCircle2
                                size={30}
                                className="text-gray-600 mx-auto mb-3"
                            />

                            <p className="text-gray-300 font-medium">
                                No tasks yet
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                                Create your first task to get started.
                            </p>
                        </div>
                    )}

                </section>

            </div>

        </main>
    );
};

export default Dashboard;
