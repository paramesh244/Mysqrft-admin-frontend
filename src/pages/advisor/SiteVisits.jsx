import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Check, Calendar } from 'lucide-react'
import { PageHeader, DataTable, StatusBadge, ConfirmModal } from '../../components/common'
import '../admin/SiteVisits.css'

/**
 * Advisor Site Visits Page
 * View and manage assigned site visits
 */

// Mock data
const mockSiteVisits = [
    { id: 1, customer: 'Vikram Singh', phone: '+91 98765 43210', project: 'Green Valley Heights', date: '2024-01-25', time: '10:00 AM', status: 'assigned' },
    { id: 2, customer: 'Anjali Nair', phone: '+91 87654 32109', project: 'Sunset Towers', date: '2024-01-23', time: '3:00 PM', status: 'confirmed' },
    { id: 3, customer: 'Rajesh Gupta', phone: '+91 76543 21098', project: 'Metro Square', date: '2024-01-25', time: '2:00 PM', status: 'confirmed' },
    { id: 4, customer: 'Meera Krishnan', phone: '+91 65432 10987', project: 'Ocean View', date: '2024-01-22', time: '11:00 AM', status: 'completed' }
]

function AdvisorSiteVisits() {
    const navigate = useNavigate()
    const [visits, setVisits] = useState(mockSiteVisits)
    const [confirmModal, setConfirmModal] = useState({ open: false, visit: null, action: '' })

    const handleConfirmVisit = (visit) => {
        setConfirmModal({ open: true, visit, action: 'confirm' })
    }

    const handleAction = () => {
        const { visit, action } = confirmModal

        setVisits(prev =>
            prev.map(v => {
                if (v.id === visit?.id) {
                    if (action === 'confirm') {
                        return { ...v, status: 'confirmed' }
                    }
                }
                return v
            })
        )
        setConfirmModal({ open: false, visit: null, action: '' })
    }

    const columns = [
        {
            header: 'Customer',
            accessor: 'customer',
            render: (row) => (
                <div className="visit-customer">
                    <div className="visit-avatar">{row.customer.charAt(0)}</div>
                    <div>
                        <div className="font-medium">{row.customer}</div>
                        <div className="text-xs text-muted">{row.phone}</div>
                    </div>
                </div>
            )
        },
        {
            header: 'Project',
            accessor: 'project'
        },
        {
            header: 'Schedule',
            accessor: 'date',
            render: (row) => (
                <div className="visit-schedule">
                    <Calendar size={14} />
                    <span>{row.date} at {row.time}</span>
                </div>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => <StatusBadge status={row.status} />
        },
        {
            header: 'Actions',
            width: '120px',
            render: (row) => (
                <div className="data-table-actions">
                    <button
                        className="data-table-action-btn view"
                        onClick={(e) => { e.stopPropagation(); navigate(`/advisor/site-visits/${row.id}`) }}
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    {row.status === 'assigned' && (
                        <button
                            className="data-table-action-btn edit"
                            onClick={(e) => { e.stopPropagation(); handleConfirmVisit(row) }}
                            title="Confirm Visit"
                        >
                            <Check size={16} />
                        </button>
                    )}
                </div>
            )
        }
    ]

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Site Visits"
                description="Manage your assigned site visits"
            />

            <div className="card">
                <DataTable
                    columns={columns}
                    data={visits}
                    searchPlaceholder="Search site visits..."
                    onRowClick={(row) => navigate(`/advisor/site-visits/${row.id}`)}
                />
            </div>

            <ConfirmModal
                isOpen={confirmModal.open}
                onClose={() => setConfirmModal({ open: false, visit: null, action: '' })}
                onConfirm={handleAction}
                title="Confirm Site Visit"
                message={`Confirm the site visit for ${confirmModal.visit?.customer} on ${confirmModal.visit?.date} at ${confirmModal.visit?.time}?`}
                confirmText="Confirm Visit"
                variant="warning"
            />
        </div>
    )
}

export default AdvisorSiteVisits
