
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './component/MainLayout.jsx';
import HomeLayout from './pages/Homepage/HomeLayout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/DashBoard.jsx';
import MyTask from './pages/MyTasks.jsx';
import ProtectedRoute from './component/routes/ProtectedRoute.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import LoadingScreen from './component/LoadingScreen.jsx';
import Profile from './pages/Profile.jsx';


import AdminUserDetails from './pages/adminPages/AdminUserDetails.jsx';
import AdminLayout from './pages/adminPages/AdminLayout.jsx';
import AdminOverview from './pages/adminPages/AdminOverview.jsx';
import AdminSetting from './pages/adminPages/AdminSetting.jsx';

import {
    getTasks,
    createTask,
    deleteTask as deleteTaskRequest,
    updateTask as updateTaskRequest,
    toggleTaskCompletion,
    deleteCompletedTasks as deleteCompletedTasksRequest
} from './services/taskServices.jsx';

import {
    getCurrentUser,
    updateProfile,
    deleteUser,
    uploadProfilePhoto
} from './services/authServices';

const App = () => {
    // Authentication state
    const [authUser, setAuthUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Task state
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Individual task loading states
    const [togglingTaskId, setTogglingTaskId] = useState(null);
    const [deletingTaskId, setDeletingTaskId] = useState(null);
    const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

    // Error states
    const [fetchError, setFetchError] = useState('');
    const [actionError, setActionError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Check the currently authenticated user
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await getCurrentUser();
                setAuthUser(response.user);
            } catch {
                setAuthUser(null);
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Refresh the user after successful login
    const handleLoginSuccess = async () => {
        try {
            const response = await getCurrentUser();
            setAuthUser(response.user);
            return response;
        } catch (error) {
            setAuthUser(null);
            throw error;
        }
    };

    // Clear user-related data after logout
    const handleLogoutSuccess = () => {
        setAuthUser(null);
        setTasks([]);
        setFetchError('');
        setActionError('');
        setSuccessMessage('');
    };

    // Fetch tasks only for regular users
    useEffect(() => {
        if (authLoading || !authUser || authUser.isAdmin) return;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                setFetchError('');

                const response = await getTasks();
                setTasks(response.tasks);
            } catch (error) {
                setFetchError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [authUser, authLoading]);

    // Create a new task
    const addTask = async (formData) => {
        try {
            setActionError('');
            setSuccessMessage('');

            const response = await createTask(formData);

            setTasks(prevTasks => [
                response.task,
                ...prevTasks
            ]);

            setSuccessMessage('Task created successfully!');
        } catch (error) {
            setActionError(error.message);
            throw error;
        }
    };

    // Update an existing task
    const updateTask = async (id, formData) => {
        try {
            setActionError('');
            setSuccessMessage('');

            const response = await updateTaskRequest(id, formData);

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === id ? response.task : task
                )
            );

            setSuccessMessage('Task updated successfully!');
        } catch (error) {
            setActionError(error.message);
            throw error;
        }
    };

    // Mark task as complete or incomplete
    const toggleTask = async (id) => {
        try {
            setActionError('');
            setTogglingTaskId(id);

            const response = await toggleTaskCompletion(id);

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === id ? response.task : task
                )
            );
        } catch (error) {
            setActionError(error.message);
        } finally {
            setTogglingTaskId(null);
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            setActionError('');
            setDeletingTaskId(id);

            await deleteTaskRequest(id);

            setTasks(prevTasks =>
                prevTasks.filter(task => task._id !== id)
            );

            return true;
        } catch (error) {
            setActionError(error.message);
            return false;
        } finally {
            setDeletingTaskId(null);
        }
    };

    // Delete all completed tasks
    const deleteCompletedTasks = async () => {
        try {
            setIsDeletingCompleted(true);
            setActionError('');

            await deleteCompletedTasksRequest();

            setTasks(prevTasks =>
                prevTasks.filter(task => !task.done)
            );
        } catch (error) {
            setActionError(error.message);
        } finally {
            setIsDeletingCompleted(false);
        }
    };

    // Clear success message
    const clearSuccessMessage = useCallback(() => {
        setSuccessMessage('');
    }, []);

    // Task statistics
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.done).length;
    const pendingTasks = tasks.filter(task => !task.done).length;


    // Update the authenticated user's profile
    const handleProfileUpdate = async (profileData) => {
        const response = await updateProfile(profileData);

        setAuthUser(response.user);

        return response;
    };

    const handleProfilePhotoUpload = async (file) => {
    const response = await uploadProfilePhoto(file);

    setAuthUser(response.user);

    return response;
    };

    const handleAccountDelete = async (userId) => {
        await deleteUser(userId);
        handleLogoutSuccess();
    };


    return (
        <Routes>
            {/* Public routes */}
            <Route
                path="/"
                element={
                    authLoading ? (
                        <LoadingScreen />
                    ) : authUser ? (
                        <Navigate
                            to={authUser.isAdmin ? '/admin' : '/dashboard'}
                            replace
                        />
                    ) : (
                        <HomeLayout />
                    )
                }
            />

            <Route
                path="/login"
                element={
                    <Login onLoginSuccess={handleLoginSuccess} />
                }
            />

            <Route
                path="/register"
                element={
                    <Register onRegisterSuccess={handleLoginSuccess} />
                }
            />

            {/* Regular user protected routes */}
            <Route
                element={
                    <ProtectedRoute
                        authUser={authUser}
                        authLoading={authLoading}
                        allowedRole="user"
                    />
                }
            >
                <Route
                    element={
                        <MainLayout
                            authUser={authUser}
                            onLogoutSuccess={handleLogoutSuccess}
                        />
                    }
                >
                    <Route
                        path="/tasks"
                        element={
                            <MyTask
                                tasks={tasks}
                                loading={loading}
                                fetchError={fetchError}
                                actionError={actionError}
                                addTask={addTask}
                                updateTask={updateTask}
                                clearSuccessMessage={clearSuccessMessage}
                                toggleTask={toggleTask}
                                successMessage={successMessage}
                                deleteTask={deleteTask}
                                isDeletingCompleted={isDeletingCompleted}
                                deleteCompletedTasks={deleteCompletedTasks}
                                togglingTaskId={togglingTaskId}
                                deletingTaskId={deletingTaskId}
                            />
                        }
                    />

                    <Route
                        path="/tasks/:taskId"
                        element={
                            <TaskDetails
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                            />
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                tasks={tasks}
                                authUser={authUser}
                                loading={loading}
                                fetchError={fetchError}
                                actionError={actionError}
                                toggleTask={toggleTask}
                                togglingTaskId={togglingTaskId}
                                deletingTaskId={deletingTaskId}
                                deleteTask={deleteTask}
                                totalTasks={totalTasks}
                                completedTasks={completedTasks}
                                pendingTasks={pendingTasks}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                        <Profile
                            authUser={authUser}
                            onProfileUpdate={handleProfileUpdate}
                            onDeleteAccount={handleAccountDelete}
                            onProfilePhotoUpload={handleProfilePhotoUpload}
                            onLogoutSuccess={handleLogoutSuccess}
                        />
                    }
                    />
                </Route>
            </Route>

            {/* Admin protected routes */}
            <Route
                element={
                    <ProtectedRoute
                        authUser={authUser}
                        authLoading={authLoading}
                        allowedRole="admin"
                    />
                }
            >
               <Route
                    path="/admin"
                    element={<AdminLayout onLogoutSuccess={handleLogoutSuccess} />}
                >
                    <Route
                        index
                        element={<AdminOverview />}
                    />

                    <Route
                        path="users/:userId"
                        element={<AdminUserDetails />}
                    />

                    <Route
                        path="settings"
                        element={<AdminSetting />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
