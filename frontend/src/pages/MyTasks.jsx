import TaskForm from '../component/TaskForm'
import TaskList from '../component/TaskList'
import TaskStats from '../component/TaskStats'

const MyTasks = ({tasks, addTask, toggleTask, deleteTask, totalTasks, completedTasks, pendingTasks , deleteCompletedTask}) => {
    return(
        <>
        <h1>My Task</h1>
        <TaskForm onAddTask={addTask}/>
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask}/>
        <TaskStats totalTasks={totalTasks} completedTasks={completedTasks} pendingTasks={pendingTasks}/>

        <button onClick={deleteCompletedTask}>
            Delete All Completed Task
        </button>
        </>
    )
}

export default MyTasks