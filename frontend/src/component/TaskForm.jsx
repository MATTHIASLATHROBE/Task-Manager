import { useState } from 'react'

const TaskForm = ({onAddTask}) => {
    const [form, setForm] = useState({ taskName: "", description: "", note: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddTask(form)
            setForm({
            taskName: "",
            description: "",
            note: ""
         })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="taskName"
                value={form.taskName}
                onChange={handleChange}
                placeholder="Task name"
            />
            <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description (optional)"
            />
            <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Note (optional)"
            />
            <button type="submit">Add Task</button>
        </form>
    )
}

export default TaskForm