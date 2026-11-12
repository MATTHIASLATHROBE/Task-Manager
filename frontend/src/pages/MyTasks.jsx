
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskForm from '../component/TaskForm'
import TaskList from '../component/TaskList'

const MyTasks = ({
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    deleteCompletedTasks
}) => {

    const { taskId } = useParams()

    const [showForm, setShowForm] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
    const [expandedTaskId, setExpandedTaskId] = useState(taskId || null)
    const [activeFilter, setActiveFilter] = useState('all')

    // Create a new task
    const handleAddTask = (formData) => {
        addTask(formData)
        setShowForm(false)
    }

    // Select a task to edit
    const handleEditTask = (task) => {
        setEditingTask(task)
        setShowForm(true)
    }

    // Save changes to an existing task
    const handleUpdateTask = (id, formData) => {
        updateTask(id, formData)
        setEditingTask(null)
        setShowForm(false)
    }

    // Cancel editing
    const handleCancelEdit = () => {
        setEditingTask(null)
        setShowForm(false)
    }

    // Open or close task details
    const handleExpandTask = (id) => {
        setExpandedTaskId(prev =>
            prev === String(id) ? null : String(id)
        )
    }

    // Filter tasks based on the selected filter
    const filteredTasks = tasks.filter(task => {

        if (activeFilter === 'pending') {
            return !task.done
        }

        if (activeFilter === 'completed') {
            return task.done
        }

        return true
    })

    return (
        <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 md:px-12">

            <div className="max-w-5xl mx-auto">

                {/* Page Header */}
                <section className="flex items-center justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">
                            My Tasks
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Manage and organize all your tasks.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setEditingTask(null)
                            setShowForm(true)
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shrink-0"
                    >
                        + Add Task
                    </button>

                </section>

                {/* Add or Edit Task Form */}
                {showForm && (
                    <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 sm:p-6 mb-8">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-lg font-semibold">
                                {editingTask ? 'Edit Task' : 'Create a New Task'}
                            </h2>

                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>

                        </div>

                       <TaskForm
                            key={editingTask?.id ?? 'new-task'}
                            onAddTask={handleAddTask}
                            onUpdateTask={handleUpdateTask}
                            editingTask={editingTask}
                            onCancelEdit={handleCancelEdit}
                        />

                    </section>
                )}

                {/* Task List */}
                <section className="bg-gray-900 border border-gray-800 rounded-xl p-5 sm:p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

                        <h2 className="text-xl font-semibold">
                            All Tasks
                        </h2>

                        {/* Task Filters */}
                        <div className="flex gap-2">

                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'all'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-black text-gray-400 hover:text-white'
                                }`}
                            >
                                All
                            </button>

                            <button
                                onClick={() => setActiveFilter('pending')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'pending'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-black text-gray-400 hover:text-white'
                                }`}
                            >
                                Pending
                            </button>

                            <button
                                onClick={() => setActiveFilter('completed')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    activeFilter === 'completed'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-black text-gray-400 hover:text-white'
                                }`}
                            >
                                Completed
                            </button>

                        </div>

                    </div>

                    <div className="text-sm text-gray-400 mb-4">
                        Showing {filteredTasks.length} of {tasks.length} tasks
                    </div>

                    {/* Display Filtered Tasks */}
                    {filteredTasks.length > 0 ? (

                        <TaskList
                            tasks={filteredTasks}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onEdit={handleEditTask}
                            expandedTaskId={expandedTaskId}
                            onExpand={handleExpandTask}
                        />

                    ) : (

                        <div className="text-center py-12">

                            <p className="text-gray-400">
                                {activeFilter === 'pending'
                                    ? 'No pending tasks.'
                                    : activeFilter === 'completed'
                                    ? 'No completed tasks.'
                                    : "You haven't added any tasks yet."
                                }
                            </p>

                        </div>

                    )}

                </section>

                {/* Delete Completed Tasks */}
                {tasks.some(task => task.done) && (
                    <div className="flex justify-end mt-6">

                        <button
                            onClick={deleteCompletedTasks}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                        >
                            Delete All Completed Tasks
                        </button>

                    </div>
                )}

            </div>

        </main>
    )
}

export default MyTasks
