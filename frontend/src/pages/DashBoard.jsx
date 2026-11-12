import { Link, useNavigate } from 'react-router-dom'

import TaskForm from '../component/TaskForm'
import TaskList from '../component/TaskList'
import TaskStats from '../component/TaskStats'

const Dashboard = ({
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    totalTasks,
    completedTasks,
    pendingTasks
}) => {

    const navigate = useNavigate()
    // Navigate to My Tasks with the selected task ID
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

                {/* Add Task */}
                <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Create a New Task
                    </h2>

                    <TaskForm onAddTask={addTask} />

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
                    {tasks.length > 0 ? (
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
