import axios from 'axios'

/**
 * Axios Instance Configuration
 * Centralized API client with interceptors for auth
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 15000
})

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('squarefeet_auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 Unauthorized - Clear auth and redirect
            if (error.response.status === 401) {
                localStorage.removeItem('squarefeet_auth_token')
                localStorage.removeItem('squarefeet_auth_user')
                window.location.href = '/admin/login'
            }

            // Handle 403 Forbidden
            if (error.response.status === 403) {
                console.error('Access forbidden')
            }
        }

        return Promise.reject(error)
    }
)

export default apiClient
