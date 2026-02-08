import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Phone, Mail, Building2, Calendar, Clock, User, MapPin } from 'lucide-react'
import { PageHeader, StatusBadge, Loader } from '../../components/common'
import './SiteVisits.css'
import './Leads.css'

/**
 * Admin Site Visit Detail Page
 * View site visit details and actions
 */

// Mock data
const mockVisit = {
    id: 1,
    customer: 'Vikram Singh',
    email: 'vikram@email.com',
    phone: '+91 98765 43210',
    project: 'Green Valley Heights',
    projectAddress: 'Whitefield Main Road, Bangalore 560066',
    date: '2024-01-25',
    time: '10:00 AM',
    status: 'confirmed',
    advisor: 'Vijay Kumar',
    advisorPhone: '+91 99999 88888',
    notes: 'Customer is interested in 3BHK east-facing unit. Please show units on 8th floor and above.',
    createdAt: '2024-01-20 10:30 AM',
    timeline: [
        { id: 1, title: 'Visit Requested', description: 'Customer requested site visit via website', time: 'Jan 20, 10:30 AM' },
        { id: 2, title: 'Advisor Assigned', description: 'Vijay Kumar assigned to this visit', time: 'Jan 20, 11:00 AM' },
        { id: 3, title: 'Visit Confirmed', description: 'Advisor confirmed the visit schedule', time: 'Jan 21, 09:00 AM' }
    ]
}

function AdminSiteVisitDetail() {
    const { id } = useParams()
    const [visit, setVisit] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // TODO: Fetch visit by ID from API
        setTimeout(() => {
            setVisit(mockVisit)
            setLoading(false)
        }, 500)
    }, [id])

    const breadcrumb = (
        <>
            <Link to="/admin/site-visits">Site Visits</Link>
            <ChevronRight size={16} />
            <span>Visit #{id}</span>
        </>
    )

    if (loading) {
        return <Loader size="large" text="Loading visit details..." />
    }

    if (!visit) {
        return <div>Site visit not found</div>
    }

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title={`Site Visit #${visit.id}`}
                breadcrumb={breadcrumb}
            />

            <div className="lead-detail-grid">
                {/* Main Content */}
                <div className="lead-detail-main">
                    {/* Customer Header */}
                    <div className="detail-section">
                        <div className="visit-detail-header">
                            <div className="visit-detail-avatar">
                                {visit.customer.charAt(0)}
                            </div>
                            <div className="visit-detail-info">
                                <h2>{visit.customer}</h2>
                                <div className="visit-detail-meta">
                                    <span><Phone size={14} /> {visit.phone}</span>
                                    <span><Mail size={14} /> {visit.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visit Details */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Visit Details</h3>
                        <div className="detail-info-grid">
                            <div className="detail-info-item">
                                <span className="detail-info-label">Project</span>
                                <span className="detail-info-value">
                                    <Building2 size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {visit.project}
                                </span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Location</span>
                                <span className="detail-info-value">
                                    <MapPin size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {visit.projectAddress}
                                </span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Date</span>
                                <span className="detail-info-value">
                                    <Calendar size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {visit.date}
                                </span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Time</span>
                                <span className="detail-info-value">
                                    <Clock size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {visit.time}
                                </span>
                            </div>
                        </div>
                        {visit.notes && (
                            <div className="detail-info-item mt-4">
                                <span className="detail-info-label">Special Notes</span>
                                <p className="detail-info-value">{visit.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Timeline */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Activity Timeline</h3>
                        <div className="timeline">
                            {visit.timeline.map(item => (
                                <div key={item.id} className="timeline-item">
                                    <div className="timeline-icon">
                                        <Calendar size={16} />
                                    </div>
                                    <div className="timeline-content">
                                        <div className="timeline-title">{item.title}</div>
                                        <div className="timeline-description">{item.description}</div>
                                        <div className="timeline-time">{item.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lead-detail-sidebar">
                    {/* Status */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Status</h3>
                        <div className="detail-info-item mb-4">
                            <span className="detail-info-label">Visit Status</span>
                            <StatusBadge status={visit.status} />
                        </div>
                        <div className="detail-info-item">
                            <span className="detail-info-label">Created</span>
                            <span className="detail-info-value text-sm">{visit.createdAt}</span>
                        </div>
                    </div>

                    {/* Assigned Advisor */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Assigned Advisor</h3>
                        {visit.advisor ? (
                            <>
                                <div className="detail-info-item mb-4">
                                    <span className="detail-info-value">
                                        <User size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                        {visit.advisor}
                                    </span>
                                </div>
                                <div className="detail-info-item">
                                    <span className="detail-info-value text-sm">
                                        <Phone size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                        {visit.advisorPhone}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <p className="text-muted">No advisor assigned yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSiteVisitDetail
