
import { apiRequest } from './api';

export const registerUser = (userData) => {
    return apiRequest('/auth/users/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

export const getCurrentUser = () => {
    return apiRequest('/auth/users/me');
};

export const loginUser = (userData) => {
    return apiRequest('/auth/users/login', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

export const logoutUser = () => {
    return apiRequest('/auth/users/logout', {
        method: 'POST'
    });
};