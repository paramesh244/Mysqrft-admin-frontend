import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../navigation/AdminSidebar'
import './Layout.css'

/**
 * Admin Layout Component
 * Wraps all admin pages with sidebar and main content area
 */
function AdminLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setSidebarCollapsed(prev => !prev)
    }

    return (
        <div className={`layout ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
            <AdminSidebar
                collapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
            />
            <main className="layout-main">
                <div className="layout-content">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default AdminLayout
