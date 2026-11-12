
import TaskItem from './TaskItem'

const TaskList = ({
    tasks,
    onToggle,
    onDelete,
    onEdit,
    clickable = false,
    onTaskClick,
    expandedTaskId,
    onExpand
}) => {

    return (
        <div className="flex flex-col gap-4">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    clickable={clickable}
                    onTaskClick={onTaskClick}
                    isExpanded={String(task.id) === expandedTaskId}
                    onExpand={() => onExpand(task.id)}
                />
            ))}
        </div>
    )
}

export default TaskList
