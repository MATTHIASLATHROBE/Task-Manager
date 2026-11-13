
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTaskById } from '../services/taskServices.jsx'
import TaskForm from '../component/TaskForm'

const TaskDetails = ({ updateTask, deleteTask }) => {
    const { taskId } = useParams()
    const navigate = useNavigate()

    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [deleteError, setDeleteError] = useState("")

    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Fetch task
    useEffect(() => {
        const fetchTask = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await getTaskById(taskId)
                setTask(response.task)

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTask()
    }, [taskId])

    // Update task
    const handleUpdateTask = async (id, formData) => {
        await updateTask(id, formData)

        setTask(prevTask => ({
            ...prevTask,
            ...formData
        }))

        setIsEditing(false)
    }

    // Delete task
    const handleDeleteTask = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        )

        if (!confirmed) return

        try {
            setIsDeleting(true)
            setDeleteError("")
            const deleted = await deleteTask(task._id)

            if (deleted) {
                navigate('/tasks')
            } else {
                setDeleteError("Unable to delete task. Please try again.")
            }

        } catch (error) {
            setDeleteError(error.message)
        } finally {
            setIsDeleting(false)
        }
    }

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <p className="text-gray-400 text-lg">
                    Loading task...
                </p>
            </main>
        )
    }

    // Fetch error state
    if (error) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full text-center">
                    <h2 className="text-xl font-semibold text-red-400 mb-3">
                        Unable to Load Task
                    </h2>

                    <p className="text-gray-400 mb-6">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate('/tasks')}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors"
                    >
                        Back to My Tasks
                    </button>
                </div>
            </main>
        )
    }

    // Task not found
    if (!task) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full text-center">
                    <h2 className="text-xl font-semibold mb-3">
                        Task Not Found
                    </h2>

                    <p className="text-gray-400 mb-6">
                        This task may have been deleted or does not exist.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate('/tasks')}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors"
                    >
                        Back to My Tasks
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 md:px-12">
            <div className="max-w-4xl mx-auto">

                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => navigate('/tasks')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <span>←</span>
                    <span>Back to My Tasks</span>
                </button>

                {/* Conditional Rendering */}
                {isEditing ? (

                    // Edit Form
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">

                        <h2 className="text-xl font-bold mb-6">
                            Edit Task
                        </h2>

                        <TaskForm
                            editingTask={task}
                            onUpdateTask={handleUpdateTask}
                            onCancelEdit={() => setIsEditing(false)}
                        />

                    </div>

                ) : (

                    // Task Details
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">

                            <div>
                                <p className="text-sm text-green-400 font-medium mb-2">
                                    TASK DETAILS
                                </p>

                                <h1 className="text-2xl sm:text-3xl font-bold break-words">
                                    {task.taskName}
                                </h1>
                            </div>

                            {/* Completion Status */}
                            <span
                                className={`w-fit px-4 py-2 rounded-full text-sm font-medium ${
                                    task.done
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                        : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}
                            >
                                {task.done ? 'Completed' : 'Pending'}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Description
                            </h2>

                            <div className="bg-black/40 border border-gray-800 rounded-xl p-5">
                                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                                    {task.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>

                        {/* Note */}
                        <div className="mb-8">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Additional Note
                            </h2>

                            <div className="bg-black/40 border border-gray-800 rounded-xl p-5">
                                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                                    {task.note || 'No additional note provided.'}
                                </p>
                            </div>
                        </div>

                        {/* Task Information */}
                        <div className="border-t border-gray-800 pt-5">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                                Task Information
                            </h2>

                            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">
                                <div>
                                    <p className="text-gray-500 mb-1">
                                        Task ID
                                    </p>

                                    <p className="text-gray-300 break-all">
                                        {task._id}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 mb-1">
                                        Created
                                    </p>

                                    <p className="text-gray-300">
                                        {task.createdAt
                                            ? new Date(task.createdAt).toLocaleDateString()
                                            : 'Not available'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Delete Error */}
                        {deleteError && (
                            <p className="text-red-400 text-sm mt-4">
                                {deleteError}
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6">

                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                disabled={isDeleting}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                Edit Task
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteTask}
                                disabled={isDeleting}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Delete Task"}
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </main>
    )
}

export default TaskDetails
