
import { useState } from 'react'

const TaskForm = ({
    onAddTask,
    onUpdateTask,
    editingTask,
    onCancelEdit
}) => {

    const [form, setForm] = useState({
        taskName: editingTask?.taskName || "",
        description: editingTask?.description || "",
        note: editingTask?.note || ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.taskName.trim()) return

        if (editingTask) {
            onUpdateTask(editingTask.id, form)
        } else {
            onAddTask(form)
        }

        setForm({
            taskName: "",
            description: "",
            note: ""
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
                type="text"
                name="taskName"
                value={form.taskName}
                onChange={handleChange}
                placeholder="Enter task name"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-green-500 transition-colors"
            />

            <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description (optional)"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-green-500 transition-colors"
            />

            <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Add a note (optional)"
                rows="3"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-green-500 transition-colors resize-none"
            />

            <div className="flex gap-3">
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                    {editingTask ? "Save Changes" : "Add Task"}
                </button>

                {editingTask && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>

        </form>
    )
}

export default TaskForm
