import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdvisorSidebar from '../navigation/AdvisorSidebar'
import './Layout.css'

/**
 * Advisor Layout Component
 * Wraps all advisor pages with sidebar and main content area
 */
function AdvisorLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setSidebarCollapsed(prev => !prev)
    }

    return (
        <div className={`layout layout-advisor ${sidebarCollapsed ? 'layout-collapsed' : ''}`}>
            <AdvisorSidebar
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

export default AdvisorLayout
