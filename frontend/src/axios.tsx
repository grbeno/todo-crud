import axios from 'axios';
import type { AxiosInstance } from 'axios';

// Export base URL from environment variable or fallback
const baseURL: string = import.meta.env.VITE_APP_URL || 'http://localhost:8000';

// Get CSRF token
const getCSRFToken = (): string | null => {
    const csrfTokenMatch = document.cookie.match(/csrftoken=([\w-]+)/);
    return csrfTokenMatch ? csrfTokenMatch[1] : null;
};

// Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'X-CSRFToken': getCSRFToken() || '', // Fallback to an empty string if null
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default axiosInstance;