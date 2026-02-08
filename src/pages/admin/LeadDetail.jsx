import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Phone, Mail, Building2, Calendar, MessageSquare, UserPlus } from 'lucide-react'
import { PageHeader, StatusBadge, Loader, Modal } from '../../components/common'
import './Leads.css'

/**
 * Admin Lead Detail Page
 * View lead details, timeline, remarks, and assign advisor
 */

// Mock data
const mockLead = {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@email.com',
    phone: '+91 98765 43210',
    project: 'Green Valley Heights',
    projectId: 1,
    interest: 'high',
    status: 'contacted',
    advisor: 'Vijay Kumar',
    advisorId: 1,
    budget: '₹80L - ₹1.2Cr',
    preferredType: '3BHK',
    source: 'Website',
    createdAt: '2024-01-20',
    timeline: [
        { id: 1, type: 'created', title: 'Lead Created', description: 'Lead submitted via website form', time: 'Jan 20, 2024 10:30 AM' },
        { id: 2, type: 'assigned', title: 'Assigned to Vijay Kumar', description: 'Lead assigned by Admin', time: 'Jan 20, 2024 11:00 AM' },
        { id: 3, type: 'contact', title: 'First Contact Made', description: 'Initial call made, customer interested in 3BHK', time: 'Jan 20, 2024 2:00 PM' },
        { id: 4, type: 'remark', title: 'Remark Added', description: 'Customer prefers east-facing apartment on higher floor', time: 'Jan 21, 2024 10:00 AM' }
    ],
    remarks: [
        { id: 1, text: 'Customer is looking for east-facing apartment on higher floor. Budget is flexible.', author: 'Vijay Kumar', date: 'Jan 21, 2024' },
        { id: 2, text: 'Scheduled site visit for Jan 25. Customer will bring family members.', author: 'Vijay Kumar', date: 'Jan 22, 2024' }
    ]
}

const mockAdvisors = [
    { id: 1, name: 'Vijay Kumar' },
    { id: 2, name: 'Neha Singh' },
    { id: 3, name: 'Rajesh Gupta' }
]

function AdminLeadDetail() {
    const { id } = useParams()
    const [lead, setLead] = useState(null)
    const [loading, setLoading] = useState(true)
    const [assignModal, setAssignModal] = useState(false)
    const [selectedAdvisor, setSelectedAdvisor] = useState('')

    useEffect(() => {
        // TODO: Fetch lead by ID from API
        setTimeout(() => {
            setLead(mockLead)
            setLoading(false)
        }, 500)
    }, [id])

    const handleAssign = () => {
        // TODO: Call API to assign advisor
        console.log('Assigning advisor:', selectedAdvisor)
        setAssignModal(false)
    }

    const breadcrumb = (
        <>
            <Link to="/admin/leads">Leads</Link>
            <ChevronRight size={16} />
            <span>{lead?.name || 'Details'}</span>
        </>
    )

    if (loading) {
        return <Loader size="large" text="Loading lead details..." />
    }

    if (!lead) {
        return <div>Lead not found</div>
    }

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title={lead.name}
                description={`Lead ID: #${lead.id}`}
                breadcrumb={breadcrumb}
                actions={
                    <button className="btn btn-primary" onClick={() => setAssignModal(true)}>
                        <UserPlus size={18} />
                        {lead.advisor ? 'Reassign' : 'Assign'} Advisor
                    </button>
                }
            />

            <div className="lead-detail-grid">
                {/* Main Content */}
                <div className="lead-detail-main">
                    {/* Contact Information */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Contact Information</h3>
                        <div className="detail-info-grid">
                            <div className="detail-info-item">
                                <span className="detail-info-label">Email</span>
                                <span className="detail-info-value">
                                    <Mail size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {lead.email}
                                </span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Phone</span>
                                <span className="detail-info-value">
                                    <Phone size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {lead.phone}
                                </span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Interested Project</span>
                                <span className="detail-info-value">
                                    <Building2 size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                    {lead.project}
                                </span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Budget</span>
                                <span className="detail-info-value">{lead.budget}</span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Preferred Type</span>
                                <span className="detail-info-value">{lead.preferredType}</span>
                            </div>
                            <div className="detail-info-item">
                                <span className="detail-info-label">Source</span>
                                <span className="detail-info-value">{lead.source}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Activity Timeline</h3>
                        <div className="timeline">
                            {lead.timeline.map(item => (
                                <div key={item.id} className="timeline-item">
                                    <div className="timeline-icon">
                                        {item.type === 'remark' ? <MessageSquare size={16} /> : <Calendar size={16} />}
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
                    {/* Status Card */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Status</h3>
                        <div className="detail-info-item mb-4">
                            <span className="detail-info-label">Lead Status</span>
                            <StatusBadge status={lead.status} />
                        </div>
                        <div className="detail-info-item mb-4">
                            <span className="detail-info-label">Interest Level</span>
                            <StatusBadge status={lead.interest} />
                        </div>
                        <div className="detail-info-item">
                            <span className="detail-info-label">Assigned Advisor</span>
                            <span className="detail-info-value">
                                {lead.advisor || <span className="text-muted">Not assigned</span>}
                            </span>
                        </div>
                    </div>

                    {/* Remarks */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Remarks</h3>
                        <div className="remarks-list">
                            {lead.remarks.map(remark => (
                                <div key={remark.id} className="remark-item">
                                    <p className="remark-text">{remark.text}</p>
                                    <div className="remark-meta">
                                        {remark.author} • {remark.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Assign Modal */}
            <Modal
                isOpen={assignModal}
                onClose={() => setAssignModal(false)}
                title="Assign Advisor"
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setAssignModal(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleAssign} disabled={!selectedAdvisor}>
                            Assign
                        </button>
                    </>
                }
                size="small"
            >
                <div className="form-group">
                    <label className="form-label">Select Advisor</label>
                    <select
                        className="form-select"
                        value={selectedAdvisor}
                        onChange={(e) => setSelectedAdvisor(e.target.value)}
                    >
                        <option value="">Choose advisor...</option>
                        {mockAdvisors.map(advisor => (
                            <option key={advisor.id} value={advisor.id}>{advisor.name}</option>
                        ))}
                    </select>
                </div>
            </Modal>
        </div>
    )
}

export default AdminLeadDetail
