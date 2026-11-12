
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './component/MainLayout.jsx'
import HomeLayout from './pages/Homepage/HomeLayout.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/DashBoard.jsx'
import MyTask from './pages/MyTasks.jsx'
import ProtectedRoute from './component/routes/ProtectedRoute.jsx'

const App = () => {
    const [tasks, setTasks] = useState([])

    // Create a new task
    const addTask = (formData) => {
        const newTask = {
            ...formData,
            id: Date.now(),
            done: false
        }

        setTasks(prevTasks => [...prevTasks, newTask])
    }

    // Update an existing task
    const updateTask = (id, formData) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id
                    ? { ...task, ...formData }
                    : task
            )
        )
    }

    // Mark task as complete or incomplete
    const toggleTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id
                    ? { ...task, done: !task.done }
                    : task
            )
        )
    }

    // Delete a task
    const deleteTask = (id) => {
        setTasks(prevTasks =>
            prevTasks.filter(task => task.id !== id)
        )
    }

    // Delete all completed tasks
    const deleteCompletedTasks = () => {
        setTasks(prevTasks =>
            prevTasks.filter(task => !task.done)
        )
    }

    // Task statistics
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.done).length
    const pendingTasks = tasks.filter(task => !task.done).length

    return (
       
<Routes>
    <Route path="/" element={<HomeLayout />} />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
            <Route
                path="/tasks/:taskId?"
                element={
                    <MyTask
                        tasks={tasks}
                        addTask={addTask}
                        updateTask={updateTask}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                        deleteCompletedTasks={deleteCompletedTasks}
                    />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <Dashboard
                        tasks={tasks}
                        addTask={addTask}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                        totalTasks={totalTasks}
                        completedTasks={completedTasks}
                        pendingTasks={pendingTasks}
                    />
                }
            />
        </Route>
    </Route>
</Routes>

    )
}

export default App
