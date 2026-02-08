import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Auth Pages
import AdminLogin from './pages/auth/AdminLogin'
import AdvisorLogin from './pages/auth/AdvisorLogin'

// Admin Pages
import AdminLayout from './components/layouts/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProjects from './pages/admin/Projects'
import AdminProjectAdd from './pages/admin/ProjectAdd'
import AdminProjectEdit from './pages/admin/ProjectEdit'
import AdminLeads from './pages/admin/Leads'
import AdminLeadDetail from './pages/admin/LeadDetail'
import AdminSiteVisits from './pages/admin/SiteVisits'
import AdminSiteVisitDetail from './pages/admin/SiteVisitDetail'
import AdminAdvisors from './pages/admin/Advisors'
import AdminAdvisorAdd from './pages/admin/AdvisorAdd'
import AdminAdvisorEdit from './pages/admin/AdvisorEdit'

// Advisor Pages
import AdvisorLayout from './components/layouts/AdvisorLayout'
import AdvisorDashboard from './pages/advisor/Dashboard'
import AdvisorLeads from './pages/advisor/Leads'
import AdvisorLeadDetail from './pages/advisor/LeadDetail'
import AdvisorSiteVisits from './pages/advisor/SiteVisits'
import AdvisorSiteVisitDetail from './pages/advisor/SiteVisitDetail'
import AdvisorProfile from './pages/advisor/Profile'

// Route Protection Components
import ProtectedRoute from './routes/ProtectedRoute'

/**
 * Main App Component
 * Handles all routing for Admin and Advisor dashboards
 */
function App() {
    const { isAuthenticated } = useAuth()

    return (
        <Routes>
            {/* Public Routes - Login Pages */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/advisor/login" element={<AdvisorLogin />} />

            {/* Admin Protected Routes */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="projects/add" element={<AdminProjectAdd />} />
                <Route path="projects/:id/edit" element={<AdminProjectEdit />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="leads/:id" element={<AdminLeadDetail />} />
                <Route path="site-visits" element={<AdminSiteVisits />} />
                <Route path="site-visits/:id" element={<AdminSiteVisitDetail />} />
                <Route path="advisors" element={<AdminAdvisors />} />
                <Route path="advisors/add" element={<AdminAdvisorAdd />} />
                <Route path="advisors/:id/edit" element={<AdminAdvisorEdit />} />
            </Route>

            {/* Advisor Protected Routes */}
            <Route
                path="/advisor"
                element={
                    <ProtectedRoute allowedRoles={['ADVISOR']}>
                        <AdvisorLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/advisor/dashboard" replace />} />
                <Route path="dashboard" element={<AdvisorDashboard />} />
                <Route path="leads" element={<AdvisorLeads />} />
                <Route path="leads/:id" element={<AdvisorLeadDetail />} />
                <Route path="site-visits" element={<AdvisorSiteVisits />} />
                <Route path="site-visits/:id" element={<AdvisorSiteVisitDetail />} />
                <Route path="profile" element={<AdvisorProfile />} />
            </Route>

            {/* Default Redirect */}
            <Route
                path="/"
                element={
                    isAuthenticated
                        ? <Navigate to="/admin/dashboard" replace />
                        : <Navigate to="/admin/login" replace />
                }
            />

            {/* Catch-all - Redirect to login */}
            <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
    )
}

export default App
