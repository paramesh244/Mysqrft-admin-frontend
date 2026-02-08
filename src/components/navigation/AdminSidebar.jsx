import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
    LayoutDashboard,
    Building2,
    Users,
    CalendarCheck,
    UserCog,
    LogOut,
    ChevronLeft,
    Menu
} from 'lucide-react'
import './Sidebar.css'

/**
 * Admin Sidebar Navigation
 * Main navigation for admin panel with collapsible functionality
 */

const adminNavItems = [
    {
        path: '/admin/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard
    },
    {
        path: '/admin/projects',
        label: 'Projects',
        icon: Building2
    },
    {
        path: '/admin/leads',
        label: 'Leads',
        icon: Users
    },
    {
        path: '/admin/site-visits',
        label: 'Site Visits',
        icon: CalendarCheck
    },
    {
        path: '/admin/advisors',
        label: 'Advisors',
        icon: UserCog
    }
]

function AdminSidebar({ collapsed, onToggle }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/admin/login')
    }

    return (
        <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Logo/Brand */}
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <div className="sidebar-logo">
                        <Building2 size={24} />
                    </div>
                    {!collapsed && (
                        <span className="sidebar-brand-text">Mysqrft</span>
                    )}
                </div>
                <button
                    className="sidebar-toggle"
                    onClick={onToggle}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <ul className="sidebar-nav-list">
                    {adminNavItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `sidebar-nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                <item.icon size={20} className="sidebar-nav-icon" />
                                {!collapsed && (
                                    <span className="sidebar-nav-label">{item.label}</span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User section */}
            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    {!collapsed && (
                        <div className="sidebar-user-info">
                            <span className="sidebar-user-name">{user?.name || 'Admin'}</span>
                            <span className="sidebar-user-role">Administrator</span>
                        </div>
                    )}
                </div>
                <button
                    className="sidebar-logout-btn"
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    <LogOut size={18} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    )
}

export default AdminSidebar
