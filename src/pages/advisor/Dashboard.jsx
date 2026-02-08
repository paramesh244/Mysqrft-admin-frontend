import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Users,
    CalendarCheck,
    CheckCircle,
    TrendingUp,
    ArrowRight,
    Clock
} from 'lucide-react'
import { PageHeader, StatusBadge } from '../../components/common'
import '../admin/Dashboard.css'

/**
 * Advisor Dashboard
 * Overview of assigned leads and site visits
 */

// Mock data
const mockStats = {
    assignedLeads: 25,
    pendingVisits: 5,
    completedThisMonth: 12,
    conversionRate: '32%'
}

const mockTodayTasks = [
    { id: 1, type: 'visit', title: 'Site Visit - Anjali Nair', project: 'Sunset Towers', time: '3:00 PM', status: 'confirmed' },
    { id: 2, type: 'follow_up', title: 'Follow up - Rahul Sharma', project: 'Green Valley', time: '11:00 AM', status: 'pending' },
    { id: 3, type: 'visit', title: 'Site Visit - Meera K', project: 'Metro Square', time: '5:00 PM', status: 'confirmed' }
]

const mockRecentLeads = [
    { id: 1, name: 'Rahul Sharma', project: 'Green Valley Heights', interest: 'high', lastContact: '2 hours ago' },
    { id: 2, name: 'Priya Patel', project: 'Sunset Towers', interest: 'medium', lastContact: '1 day ago' },
    { id: 3, name: 'Amit Kumar', project: 'Metro Square', interest: 'high', lastContact: '3 days ago' }
]

function AdvisorDashboard() {
    const [stats] = useState(mockStats)
    const [todayTasks] = useState(mockTodayTasks)
    const [recentLeads] = useState(mockRecentLeads)

    useEffect(() => {
        // TODO: Fetch real data from API
    }, [])

    const statCards = [
        {
            label: 'Assigned Leads',
            value: stats.assignedLeads,
            icon: Users,
            color: 'primary',
            link: '/advisor/leads'
        },
        {
            label: 'Pending Visits',
            value: stats.pendingVisits,
            icon: CalendarCheck,
            color: 'warning',
            link: '/advisor/site-visits'
        },
        {
            label: 'Completed This Month',
            value: stats.completedThisMonth,
            icon: CheckCircle,
            color: 'success',
            link: '/advisor/site-visits'
        },
        {
            label: 'Conversion Rate',
            value: stats.conversionRate,
            icon: TrendingUp,
            color: 'info',
            link: '/advisor/profile'
        }
    ]

    return (
        <div className="dashboard animate-fadeIn">
            <PageHeader
                title="Welcome Back!"
                description="Here's your daily overview and pending tasks."
            />

            {/* Stats Grid */}
            <div className="dashboard-stats">
                {statCards.map((stat, index) => (
                    <Link
                        key={index}
                        to={stat.link}
                        className={`stat-card stat-card-${stat.color}`}
                    >
                        <div className="stat-card-icon">
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{stat.value}</span>
                            <span className="stat-card-label">{stat.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Activity Grid */}
            <div className="dashboard-grid">
                {/* Today's Tasks */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">Today's Tasks</h3>
                        <Link to="/advisor/site-visits" className="card-link">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="dashboard-list">
                        {todayTasks.map(task => (
                            <Link
                                key={task.id}
                                to={task.type === 'visit' ? `/advisor/site-visits/${task.id}` : `/advisor/leads/${task.id}`}
                                className="dashboard-list-item"
                            >
                                <div className="dashboard-list-icon">
                                    <Clock size={18} />
                                </div>
                                <div className="dashboard-list-content">
                                    <span className="dashboard-list-title">{task.title}</span>
                                    <span className="dashboard-list-subtitle">{task.project}</span>
                                </div>
                                <div className="dashboard-list-meta">
                                    <StatusBadge status={task.status} />
                                    <span className="dashboard-list-time">{task.time}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Leads</h3>
                        <Link to="/advisor/leads" className="card-link">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="dashboard-list">
                        {recentLeads.map(lead => (
                            <Link
                                key={lead.id}
                                to={`/advisor/leads/${lead.id}`}
                                className="dashboard-list-item"
                            >
                                <div className="dashboard-list-avatar">
                                    {lead.name.charAt(0)}
                                </div>
                                <div className="dashboard-list-content">
                                    <span className="dashboard-list-title">{lead.name}</span>
                                    <span className="dashboard-list-subtitle">{lead.project}</span>
                                </div>
                                <div className="dashboard-list-meta">
                                    <StatusBadge status={lead.interest} />
                                    <span className="dashboard-list-time">{lead.lastContact}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvisorDashboard
