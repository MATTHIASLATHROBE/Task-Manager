

const API_BASE_URL = import.meta.env.DEV
    ? `http://${window.location.hostname}:5000/api`
    : import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, options = {}) => {
    const { headers: customHeaders = {}, ...restOptions } = options;

    const isFormData = restOptions.body instanceof FormData;

    const headers = {
        ...(!isFormData && {
            'Content-Type': 'application/json'
        }),
        ...customHeaders
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...restOptions,
        credentials: 'include',
        headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || 'Something went wrong');
    }

    return data;
};