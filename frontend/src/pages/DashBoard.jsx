
import { Link, useNavigate } from 'react-router-dom'
import TaskList from '../component/TaskList'
import TaskStats from '../component/TaskStats'

const Dashboard = ({
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

    const navigate = useNavigate()

    // Navigate to the selected task's details page
    const openTask = (taskId) => {
        navigate(`/tasks/${taskId}`)
    }

    return (
        <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 md:px-12">

            <div className="max-w-6xl mx-auto">

                {/* Dashboard Header */}
                <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            Dashboard
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Welcome back! Here's an overview of your tasks.
                        </p>
                    </div>

                    <Link
                        to="/tasks"
                        className="bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-3 rounded-lg text-center font-medium"
                    >
                        View All Tasks
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

                {/* Create Task Button */}
                <section className="mb-8">
                    <button
                        type="button"
                        onClick={() => navigate('/tasks', {
                            state: { openCreateForm: true }
                        })}
                        className="bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-3 rounded-lg font-medium"
                    >
                        + Create Task
                    </button>
                </section>

                {/* Recent Tasks */}
                <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-xl font-semibold">
                            Recent Tasks
                        </h2>

                        <span className="text-sm text-gray-400">
                            {totalTasks} tasks
                        </span>

                    </div>

                    {/* Action Error */}
                    {actionError && (
                        <p className="text-red-400 mb-4">
                            {actionError}
                        </p>
                    )}

                    {/* Task List States */}
                    {loading ? (
                        <p className="text-gray-400 text-center py-8">
                            Loading your tasks...
                        </p>
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
                        <p className="text-gray-400 text-center py-8">
                            No tasks available yet. Create your first task!
                        </p>
                    )}

                </section>

            </div>

        </main>
    )
}

export default Dashboard
