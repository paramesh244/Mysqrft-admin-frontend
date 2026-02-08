import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Phone, Mail, Building2, Calendar, Clock, MapPin, Check, CheckCircle } from 'lucide-react'
import { PageHeader, StatusBadge, Loader, Modal } from '../../components/common'
import '../admin/SiteVisits.css'
import '../admin/Leads.css'

/**
 * Advisor Site Visit Detail Page
 * View visit details and mark as complete
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
    notes: 'Customer is interested in 3BHK east-facing unit. Please show units on 8th floor and above.',
    createdAt: '2024-01-20 10:30 AM'
}

function AdvisorSiteVisitDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [visit, setVisit] = useState(null)
    const [loading, setLoading] = useState(true)
    const [completeModal, setCompleteModal] = useState(false)
    const [remarks, setRemarks] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setVisit(mockVisit)
            setLoading(false)
        }, 500)
    }, [id])

    const handleConfirmVisit = () => {
        setVisit(prev => ({ ...prev, status: 'confirmed' }))
    }

    const handleCompleteVisit = () => {
        setSubmitting(true)
        // TODO: Call API
        setTimeout(() => {
            setVisit(prev => ({ ...prev, status: 'completed' }))
            setCompleteModal(false)
            setSubmitting(false)
        }, 500)
    }

    const breadcrumb = (
        <>
            <Link to="/advisor/site-visits">Site Visits</Link>
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
                </div>

                {/* Sidebar */}
                <div className="lead-detail-sidebar">
                    {/* Status */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">Status</h3>
                        <StatusBadge status={visit.status} />
                    </div>

                    {/* Actions */}
                    <div className="detail-section visit-actions-card">
                        <h3 className="detail-section-title">Actions</h3>
                        <div className="visit-status-actions">
                            {visit.status === 'assigned' && (
                                <button className="btn btn-primary" onClick={handleConfirmVisit}>
                                    <Check size={18} />
                                    Confirm Visit
                                </button>
                            )}
                            {visit.status === 'confirmed' && (
                                <button className="btn btn-primary" onClick={() => setCompleteModal(true)}>
                                    <CheckCircle size={18} />
                                    Mark as Completed
                                </button>
                            )}
                            {visit.status === 'completed' && (
                                <p className="text-sm text-muted text-center">
                                    This visit has been completed.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Modal */}
            <Modal
                isOpen={completeModal}
                onClose={() => setCompleteModal(false)}
                title="Complete Site Visit"
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={() => setCompleteModal(false)}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleCompleteVisit}
                            disabled={submitting}
                        >
                            {submitting ? 'Completing...' : 'Mark Complete'}
                        </button>
                    </>
                }
                size="medium"
            >
                <div className="form-group">
                    <label className="form-label">Visit Remarks (Optional)</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Add any remarks about the site visit..."
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        rows={4}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default AdvisorSiteVisitDetail
