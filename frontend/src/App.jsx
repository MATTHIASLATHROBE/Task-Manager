import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import MainLayout from './component/MainLayout.jsx'
import HomeLayout from './pages/Homepage/HomeLayout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
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
                <Route path="/" element={<HomeLayout/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
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