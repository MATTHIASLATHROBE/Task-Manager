import { apiRequest } from './api';

export const getAllUsers = () => {
    return apiRequest('/admin/users');
};

export const getUserDetails = (userId) => {
    return apiRequest(`/admin/users/${userId}`);
};

export const getUserTasks = (userId) => {
    return apiRequest(`/admin/users/${userId}/tasks`);
};

export const getDashboardStats = () => {
    return apiRequest('/admin/dashboard/stats');
};
