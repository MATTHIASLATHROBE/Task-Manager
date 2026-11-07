import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import MainLayout from './component/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import MyTasks from './pages/MyTasks.jsx'


const App = () => {
    const [tasks, setTasks] = useState([])

    const addTask = (formData) => {
    const newTask = {
        ...formData,
        id: Date.now(),
        done: false
    }
    setTasks(prevTasks => [...prevTasks, newTask])
    }
    const toggleTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id
                    ? { ...task, done: !task.done }
                    : task
            )
        )
    }
    const deleteTask = (id) => {
    setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== id)
    )
    }
    const deleteCompletedTasks = () => {
        setTasks(prevTasks => prevTasks.filter(task => !task.done))
    }
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.done).length
    const pendingTasks = tasks.filter(task => !task.done).length

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout><Home/></MainLayout>}/>
                <Route path="/login" element={<MainLayout><Login/></MainLayout>}/>
                <Route path="/tasks" element={<MainLayout><MyTasks 
                    tasks={tasks} addTask={addTask}
                    toggleTask={toggleTask} deleteTask={deleteTask}
                    totalTasks={totalTasks} completedTasks={completedTasks} pendingTasks={pendingTasks}
                    deleteCompletedTask={deleteCompletedTasks}
                /></MainLayout>}/>
            </Routes>

          
        </>
    )
}

export default App