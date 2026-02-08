import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from '../components/common/Loader'

/**
 * Protected Route Component
 * Wraps routes that require authentication and specific roles
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string[]} props.allowedRoles - Roles allowed to access this route
 */
function ProtectedRoute({ children, allowedRoles = [] }) {
    const { isAuthenticated, user, loading, hasRole } = useAuth()
    const location = useLocation()

    // Show loader while checking auth state
    if (loading) {
        return (
            <div className="loading-screen">
                <Loader size="large" text="Checking authentication..." />
            </div>
        )
    }

    // Redirect to appropriate login if not authenticated
    if (!isAuthenticated) {
        // Determine which login page to redirect to based on attempted path
        const isAdvisorRoute = location.pathname.startsWith('/advisor')
        const loginPath = isAdvisorRoute ? '/advisor/login' : '/admin/login'

        return <Navigate to={loginPath} state={{ from: location }} replace />
    }

    // Check role-based access
    if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
        // Redirect to user's correct dashboard if they don't have access
        const redirectPath = user?.role === 'ADMIN' ? '/admin/dashboard' : '/advisor/dashboard'
        return <Navigate to={redirectPath} replace />
    }

    return children
}

export default ProtectedRoute
