const TaskItem = ({ task, onToggle, onDelete }) => {

    return (
        <>
             <p style={{ textDecoration: task.done ? "line-through" : "none" }}>
                {task.taskName}
            </p>

            <button onClick={() => onToggle(task.id)}>
                {task.done ? "Pending" : "Complete"}
            </button>

            <button onClick={() => onDelete(task.id)}>
                    Delete
            </button>
        </>
    )
}

export default TaskItem