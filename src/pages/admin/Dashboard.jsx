import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Building2,
    Users,
    CalendarCheck,
    UserCog,
    TrendingUp,
    ArrowRight,
    Clock
} from 'lucide-react'
import { PageHeader, StatusBadge } from '../../components/common'
import './Dashboard.css'

/**
 * Admin Dashboard
 * Overview page with stats, recent activity, and quick actions
 */

// Mock data - Replace with API calls
const mockStats = {
    totalProjects: 24,
    activeLeads: 156,
    pendingVisits: 18,
    totalAdvisors: 12
}

const mockRecentLeads = [
    { id: 1, name: 'Rahul Sharma', project: 'Green Valley Heights', status: 'new', date: '2 hours ago' },
    { id: 2, name: 'Priya Patel', project: 'Sunset Towers', status: 'contacted', date: '4 hours ago' },
    { id: 3, name: 'Amit Kumar', project: 'Metro Square', status: 'interested', date: '5 hours ago' },
    { id: 4, name: 'Sneha Reddy', project: 'Ocean View', status: 'new', date: '1 day ago' }
]

const mockRecentVisits = [
    { id: 1, customer: 'Vikram Singh', project: 'Green Valley', status: 'requested', time: 'Tomorrow 10:00 AM' },
    { id: 2, customer: 'Anjali Nair', project: 'Sunset Towers', status: 'confirmed', time: 'Today 3:00 PM' },
    { id: 3, customer: 'Rajesh Gupta', project: 'Metro Square', status: 'assigned', time: 'Jan 25, 2:00 PM' }
]

function AdminDashboard() {
    const [stats, setStats] = useState(mockStats)
    const [recentLeads, setRecentLeads] = useState(mockRecentLeads)
    const [recentVisits, setRecentVisits] = useState(mockRecentVisits)

    useEffect(() => {
        // TODO: Fetch real data from API
        // dashboardApi.getStats().then(res => setStats(res.data))
    }, [])

    const statCards = [
        {
            label: 'Total Projects',
            value: stats.totalProjects,
            icon: Building2,
            color: 'primary',
            link: '/admin/projects'
        },
        {
            label: 'Active Leads',
            value: stats.activeLeads,
            icon: Users,
            color: 'success',
            link: '/admin/leads'
        },
        {
            label: 'Pending Visits',
            value: stats.pendingVisits,
            icon: CalendarCheck,
            color: 'warning',
            link: '/admin/site-visits'
        },
        {
            label: 'Advisors',
            value: stats.totalAdvisors,
            icon: UserCog,
            color: 'info',
            link: '/admin/advisors'
        }
    ]

    return (
        <div className="dashboard animate-fadeIn">
            <PageHeader
                title="Dashboard"
                description="Welcome back! Here's what's happening today."
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
                        <TrendingUp size={16} className="stat-card-trend" />
                    </Link>
                ))}
            </div>

            {/* Recent Activity Grid */}
            <div className="dashboard-grid">
                {/* Recent Leads */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">Recent Leads</h3>
                        <Link to="/admin/leads" className="card-link">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="dashboard-list">
                        {recentLeads.map(lead => (
                            <Link
                                key={lead.id}
                                to={`/admin/leads/${lead.id}`}
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
                                    <StatusBadge status={lead.status} />
                                    <span className="dashboard-list-time">{lead.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Upcoming Site Visits */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h3 className="card-title">Upcoming Site Visits</h3>
                        <Link to="/admin/site-visits" className="card-link">
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="dashboard-list">
                        {recentVisits.map(visit => (
                            <Link
                                key={visit.id}
                                to={`/admin/site-visits/${visit.id}`}
                                className="dashboard-list-item"
                            >
                                <div className="dashboard-list-icon">
                                    <Clock size={18} />
                                </div>
                                <div className="dashboard-list-content">
                                    <span className="dashboard-list-title">{visit.customer}</span>
                                    <span className="dashboard-list-subtitle">{visit.project}</span>
                                </div>
                                <div className="dashboard-list-meta">
                                    <StatusBadge status={visit.status} />
                                    <span className="dashboard-list-time">{visit.time}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
