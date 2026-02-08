import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    User,
    LogOut,
    ChevronLeft,
    Menu
} from 'lucide-react'
import './Sidebar.css'

/**
 * Advisor Sidebar Navigation
 * Simplified navigation for advisor panel
 */

const advisorNavItems = [
    {
        path: '/advisor/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard
    },
    {
        path: '/advisor/leads',
        label: 'My Leads',
        icon: Users
    },
    {
        path: '/advisor/site-visits',
        label: 'Site Visits',
        icon: CalendarCheck
    },
    {
        path: '/advisor/profile',
        label: 'Profile',
        icon: User
    }
]

function AdvisorSidebar({ collapsed, onToggle }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/advisor/login')
    }

    return (
        <aside className={`sidebar sidebar-advisor ${collapsed ? 'sidebar-collapsed' : ''}`}>
            {/* Logo/Brand */}
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <div className="sidebar-logo advisor-logo">
                        <User size={24} />
                    </div>
                    {!collapsed && (
                        <span className="sidebar-brand-text">SquareFeet</span>
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
                    {advisorNavItems.map((item) => (
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
                    <div className="sidebar-user-avatar advisor-avatar">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    {!collapsed && (
                        <div className="sidebar-user-info">
                            <span className="sidebar-user-name">{user?.name || 'Advisor'}</span>
                            <span className="sidebar-user-role">Advisor</span>
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

export default AdvisorSidebar
