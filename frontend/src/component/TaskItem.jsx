
const TaskItem = ({
    task,
    onToggle,
    onDelete,
    onEdit,
    clickable = false,
    onTaskClick,
    isExpanded = false,
    onExpand,
    isToggling = false,
    isDeleting = false
}) => {

    const handleTaskClick = () => {
        if (clickable) {
            onTaskClick(task._id)
        } else {
            onExpand(task._id)
        }
    }

    const isBusy = isToggling || isDeleting

    return (
        <div
            onClick={clickable ? handleTaskClick : undefined}
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-black border border-gray-800 rounded-lg px-4 py-3 transition-colors ${
                clickable
                    ? "cursor-pointer hover:border-green-500/50"
                    : ""
            }`}
        >

            {/* Task Details */}
            <div className="flex-1 min-w-0">

                <div className="flex items-start justify-between gap-3">

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleTaskClick()
                        }}
                        className={`text-left text-base font-medium break-words ${
                            task.done
                                ? "text-gray-500 line-through"
                                : "text-white hover:text-green-400"
                        }`}
                    >
                        {task.taskName}
                    </button>

                    {task.done && (
                        <span className="shrink-0 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full lg:hidden">
                            Completed
                        </span>
                    )}

                </div>

                {/* Show details only when expanded */}
                {!clickable && isExpanded && (
                    <div className="mt-3 border-t border-gray-800 pt-3">

                        {task.description && (
                            <p className="text-xs text-gray-400 mb-2 break-words">
                                <strong>Description:</strong> {task.description}
                            </p>
                        )}

                        {task.note && (
                            <p className="text-xs text-gray-500 break-words">
                                <strong>Note:</strong> {task.note}
                            </p>
                        )}

                    </div>
                )}

            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 shrink-0">

                {onEdit && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation()
                            onEdit(task)
                        }}
                        className="bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                    >
                        Edit
                    </button>
                )}

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggle(task._id)
                    }}
                    disabled={isBusy}
                    className="bg-green-600/15 hover:bg-green-600/25 text-green-400 px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isToggling ? "Updating..." : task.done ? "Undo" : "Complete"}
                </button>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        onDelete(task._id)
                    }}
                    disabled={isBusy}
                    className="bg-red-600/15 hover:bg-red-600/25 text-red-400 px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>

            </div>

        </div>
    )
}

export default TaskItem
