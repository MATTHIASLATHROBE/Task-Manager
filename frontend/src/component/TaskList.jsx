import TaskItem from './TaskItem'

const TaskList = ({
    tasks,
    onToggle,
    onDelete,
    onEdit,
    clickable = false,
    onTaskClick,
    togglingTaskId,
    deletingTaskId
}) => {

    return (
        <div className="flex flex-col gap-4">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    clickable={clickable}
                    isToggling={togglingTaskId === task._id}
                    isDeleting={deletingTaskId === task._id}
                    onTaskClick={onTaskClick}
                />
            ))}
        </div>
    )
}

export default TaskList