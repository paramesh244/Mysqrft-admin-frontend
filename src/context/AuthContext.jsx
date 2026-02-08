import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Authentication Context
 * Manages user authentication state, login/logout, and role-based access
 */
const AuthContext = createContext(null)

// Storage keys for persistence
const AUTH_TOKEN_KEY = 'squarefeet_auth_token'
const AUTH_USER_KEY = 'squarefeet_auth_user'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    // Initialize auth state from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY)
        const storedUser = localStorage.getItem(AUTH_USER_KEY)

        if (storedToken && storedUser) {
            try {
                setToken(storedToken)
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error('Error parsing stored user:', error)
                localStorage.removeItem(AUTH_TOKEN_KEY)
                localStorage.removeItem(AUTH_USER_KEY)
            }
        }
        setLoading(false)
    }, [])

    /**
     * Login user with credentials
     * @param {Object} credentials - { email, password, role }
     * @returns {Promise<Object>} - User object on success
     */
    const login = async (credentials) => {
        // Simulate API call - Replace with actual API integration
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock validation - In production, this would be an API call
                if (credentials.email && credentials.password) {
                    const mockUser = {
                        id: credentials.role === 'ADMIN' ? 'admin-001' : 'advisor-001',
                        name: credentials.role === 'ADMIN' ? 'Admin User' : 'Advisor User',
                        email: credentials.email,
                        role: credentials.role,
                        avatar: null
                    }
                    const mockToken = `mock-jwt-token-${Date.now()}`

                    // Persist to localStorage
                    localStorage.setItem(AUTH_TOKEN_KEY, mockToken)
                    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(mockUser))

                    setToken(mockToken)
                    setUser(mockUser)

                    resolve(mockUser)
                } else {
                    reject(new Error('Invalid credentials'))
                }
            }, 800) // Simulate network delay
        })
    }

    /**
     * Logout current user
     */
    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(AUTH_USER_KEY)
        setToken(null)
        setUser(null)
    }

    /**
     * Check if user has a specific role
     * @param {string|string[]} roles - Role(s) to check
     * @returns {boolean}
     */
    const hasRole = (roles) => {
        if (!user) return false
        const roleArray = Array.isArray(roles) ? roles : [roles]
        return roleArray.includes(user.role)
    }

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        logout,
        hasRole
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * Custom hook to use auth context
 */
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default AuthContext
