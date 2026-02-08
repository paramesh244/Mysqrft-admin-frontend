import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Phone, Mail, Building2, Calendar, MessageSquare, Send, RefreshCw } from 'lucide-react'
import { PageHeader, StatusBadge, Loader, Modal } from '../../components/common'
import '../admin/Leads.css'

/**
 * Advisor Lead Detail Page
 * View lead details, update status, and add remarks
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
    budget: '₹80L - ₹1.2Cr',
    preferredType: '3BHK',
    timeline: [
        { id: 1, type: 'assigned', title: 'Lead Assigned', description: 'Lead assigned to you', time: 'Jan 20, 11:00 AM' },
        { id: 2, type: 'contact', title: 'First Contact Made', description: 'Initial call made, customer interested in 3BHK', time: 'Jan 20, 2:00 PM' },
        { id: 3, type: 'remark', title: 'Remark Added', description: 'Customer prefers east-facing apartment on higher floor', time: 'Jan 21, 10:00 AM' }
    ],
    remarks: [
        { id: 1, text: 'Customer is looking for east-facing apartment on higher floor. Budget is flexible.', date: 'Jan 21, 2024' },
        { id: 2, text: 'Scheduled site visit for Jan 25. Customer will bring family members.', date: 'Jan 22, 2024' }
    ],
    interestedProperties: [
        { id: 1, name: 'Unit 801 - 3BHK East', price: '₹95L', area: '1650 sqft' },
        { id: 2, name: 'Unit 1002 - 3BHK East', price: '₹1.05Cr', area: '1720 sqft' }
    ]
}

// Lead status options for advisor
const LEAD_STATUS_OPTIONS = [
    { value: 'new', label: 'New', description: 'Newly assigned lead' },
    { value: 'contacted', label: 'Contacted', description: 'Initial contact made' },
    { value: 'follow_up', label: 'Follow Up', description: 'Needs follow up call' },
    { value: 'interested', label: 'Interested', description: 'Customer shows interest' },
    { value: 'site_visit_scheduled', label: 'Site Visit Scheduled', description: 'Visit has been scheduled' },
    { value: 'negotiating', label: 'Negotiating', description: 'In price negotiation' },
    { value: 'converted', label: 'Converted', description: 'Lead converted to customer' },
    { value: 'not_interested', label: 'Not Interested', description: 'Customer not interested' },
    { value: 'lost', label: 'Lost', description: 'Lead lost to competition' }
]

function AdvisorLeadDetail() {
    const { id } = useParams()
    const [lead, setLead] = useState(null)
    const [loading, setLoading] = useState(true)
    const [newRemark, setNewRemark] = useState('')
    const [submitting, setSubmitting] = useState(false)

    // Status update state
    const [statusModal, setStatusModal] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('')
    const [statusNote, setStatusNote] = useState('')
    const [updatingStatus, setUpdatingStatus] = useState(false)

    useEffect(() => {
        // TODO: Fetch lead by ID from API
        setTimeout(() => {
            setLead(mockLead)
            setSelectedStatus(mockLead.status)
            setLoading(false)
        }, 500)
    }, [id])

    const handleAddRemark = async (e) => {
        e.preventDefault()
        if (!newRemark.trim()) return

        setSubmitting(true)
        // TODO: Call API to add remark

        setTimeout(() => {
            setLead(prev => ({
                ...prev,
                remarks: [
                    { id: Date.now(), text: newRemark, date: new Date().toLocaleDateString() },
                    ...prev.remarks
                ],
                timeline: [
                    { id: Date.now(), type: 'remark', title: 'Remark Added', description: newRemark.substring(0, 50) + '...', time: 'Just now' },
                    ...prev.timeline
                ]
            }))
            setNewRemark('')
            setSubmitting(false)
        }, 500)
    }

    const handleUpdateStatus = async () => {
        if (!selectedStatus || selectedStatus === lead.status) {
            setStatusModal(false)
            return
        }

        setUpdatingStatus(true)
        // TODO: Call API to update status

        setTimeout(() => {
            const statusLabel = LEAD_STATUS_OPTIONS.find(s => s.value === selectedStatus)?.label
            setLead(prev => ({
                ...prev,
                status: selectedStatus,
                timeline: [
                    {
                        id: Date.now(),
                        type: 'status',
                        title: `Status Updated to ${statusLabel}`,
                        description: statusNote || `Lead status changed to ${statusLabel}`,
                        time: 'Just now'
                    },
                    ...prev.timeline
                ]
            }))
            setStatusModal(false)
            setStatusNote('')
            setUpdatingStatus(false)
        }, 500)
    }

    const openStatusModal = () => {
        setSelectedStatus(lead.status)
        setStatusNote('')
        setStatusModal(true)
    }

    const breadcrumb = (
        <>
            <Link to="/advisor/leads">My Leads</Link>
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
                        </div>
                    </div>

                    {/* Interested Properties */}
                    {lead.interestedProperties?.length > 0 && (
                        <div className="detail-section">
                            <h3 className="detail-section-title">Interested Properties</h3>
                            <div className="properties-list">
                                {lead.interestedProperties.map(prop => (
                                    <div key={prop.id} className="property-item">
                                        <div className="property-name">{prop.name}</div>
                                        <div className="property-meta">
                                            <span>{prop.price}</span>
                                            <span>•</span>
                                            <span>{prop.area}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Activity Timeline</h3>
                        <div className="timeline">
                            {lead.timeline.map(item => (
                                <div key={item.id} className="timeline-item">
                                    <div className="timeline-icon">
                                        {item.type === 'remark' ? <MessageSquare size={16} /> :
                                            item.type === 'status' ? <RefreshCw size={16} /> :
                                                <Calendar size={16} />}
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
                    {/* Status with Update Button */}
                    <div className="detail-section">
                        <div className="status-header">
                            <h3 className="detail-section-title">Status</h3>
                            <button
                                className="btn btn-sm btn-secondary"
                                onClick={openStatusModal}
                            >
                                <RefreshCw size={14} />
                                Update
                            </button>
                        </div>
                        <div className="detail-info-item mb-4">
                            <span className="detail-info-label">Lead Status</span>
                            <StatusBadge status={lead.status} />
                        </div>
                        <div className="detail-info-item">
                            <span className="detail-info-label">Interest Level</span>
                            <StatusBadge status={lead.interest} />
                        </div>
                    </div>

                    {/* Add Remark */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Add Remark</h3>
                        <form onSubmit={handleAddRemark}>
                            <textarea
                                className="form-textarea"
                                placeholder="Add a remark or update..."
                                value={newRemark}
                                onChange={(e) => setNewRemark(e.target.value)}
                                rows={3}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-2"
                                disabled={!newRemark.trim() || submitting}
                            >
                                <Send size={16} />
                                {submitting ? 'Adding...' : 'Add Remark'}
                            </button>
                        </form>
                    </div>

                    {/* Remarks */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">My Remarks</h3>
                        <div className="remarks-list">
                            {lead.remarks.map(remark => (
                                <div key={remark.id} className="remark-item">
                                    <p className="remark-text">{remark.text}</p>
                                    <div className="remark-meta">{remark.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Update Modal */}
            <Modal
                isOpen={statusModal}
                onClose={() => setStatusModal(false)}
                title="Update Lead Status"
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setStatusModal(false)}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleUpdateStatus}
                            disabled={updatingStatus || selectedStatus === lead.status}
                        >
                            {updatingStatus ? 'Updating...' : 'Update Status'}
                        </button>
                    </>
                }
                size="medium"
            >
                <div className="status-update-form">
                    <div className="form-group">
                        <label className="form-label">Select New Status</label>
                        <div className="status-options">
                            {LEAD_STATUS_OPTIONS.map(option => (
                                <label
                                    key={option.value}
                                    className={`status-option ${selectedStatus === option.value ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={option.value}
                                        checked={selectedStatus === option.value}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                    />
                                    <div className="status-option-content">
                                        <span className="status-option-label">{option.label}</span>
                                        <span className="status-option-desc">{option.description}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <label className="form-label">Note (Optional)</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Add a note about this status change..."
                            value={statusNote}
                            onChange={(e) => setStatusNote(e.target.value)}
                            rows={2}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AdvisorLeadDetail
