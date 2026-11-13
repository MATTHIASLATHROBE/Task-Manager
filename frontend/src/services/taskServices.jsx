import { apiRequest } from './api'

export const getTasks = () => {
    return apiRequest('/tasks')
}

export const createTask = (taskData) => {
    return apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData)
    });
};

export const deleteTask = (taskId) => {
    return apiRequest(`/tasks/${taskId}`, {
        method: 'DELETE'
    })
}

export const toggleTaskCompletion = (taskId) => {
    return apiRequest(`/tasks/${taskId}/complete`, {
        method: 'PATCH'
    })
}

export const updateTask = (taskId, taskData) => {
    return apiRequest(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(taskData)
    })
}

export const getTaskById = (taskId) => {
    return apiRequest(`/tasks/${taskId}`)
}

export const deleteCompletedTasks = () => {
    return apiRequest('/tasks/completed', {
        method: 'DELETE'
    })
}