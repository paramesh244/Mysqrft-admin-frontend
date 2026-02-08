import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, UserPlus, Calendar } from 'lucide-react'
import { PageHeader, DataTable, StatusBadge, Modal } from '../../components/common'
import './SiteVisits.css'

/**
 * Admin Site Visits Page
 * View and manage all site visit requests
 */

// Mock data
const mockSiteVisits = [
    { id: 1, customer: 'Vikram Singh', phone: '+91 98765 43210', project: 'Green Valley Heights', date: '2024-01-25', time: '10:00 AM', status: 'requested', advisor: null },
    { id: 2, customer: 'Anjali Nair', phone: '+91 87654 32109', project: 'Sunset Towers', date: '2024-01-23', time: '3:00 PM', status: 'confirmed', advisor: 'Vijay Kumar' },
    { id: 3, customer: 'Rajesh Gupta', phone: '+91 76543 21098', project: 'Metro Square', date: '2024-01-25', time: '2:00 PM', status: 'assigned', advisor: 'Neha Singh' },
    { id: 4, customer: 'Meera Krishnan', phone: '+91 65432 10987', project: 'Ocean View', date: '2024-01-22', time: '11:00 AM', status: 'completed', advisor: 'Rajesh Gupta' },
    { id: 5, customer: 'Suresh Babu', phone: '+91 54321 09876', project: 'Sky Gardens', date: '2024-01-26', time: '4:00 PM', status: 'requested', advisor: null },
    { id: 6, customer: 'Priya Menon', phone: '+91 43210 98765', project: 'Green Valley Heights', date: '2024-01-21', time: '10:30 AM', status: 'cancelled', advisor: 'Vijay Kumar' }
]

const mockAdvisors = [
    { id: 1, name: 'Vijay Kumar' },
    { id: 2, name: 'Neha Singh' },
    { id: 3, name: 'Rajesh Gupta' },
    { id: 4, name: 'Priyanka Sharma' }
]

function AdminSiteVisits() {
    const navigate = useNavigate()
    const [visits, setVisits] = useState(mockSiteVisits)
    const [assignModal, setAssignModal] = useState({ open: false, visit: null })
    const [selectedAdvisor, setSelectedAdvisor] = useState('')

    const handleAssign = (visit) => {
        setAssignModal({ open: true, visit })
        setSelectedAdvisor('')
    }

    const confirmAssign = () => {
        if (!selectedAdvisor) return

        const advisor = mockAdvisors.find(a => a.id === parseInt(selectedAdvisor))
        setVisits(prev =>
            prev.map(v =>
                v.id === assignModal.visit?.id
                    ? { ...v, advisor: advisor?.name, status: 'assigned' }
                    : v
            )
        )
        setAssignModal({ open: false, visit: null })
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
            header: 'Advisor',
            accessor: 'advisor',
            render: (row) => row.advisor || <span className="text-muted">Unassigned</span>
        },
        {
            header: 'Actions',
            width: '100px',
            render: (row) => (
                <div className="data-table-actions">
                    <button
                        className="data-table-action-btn view"
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/site-visits/${row.id}`) }}
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    {row.status === 'requested' && (
                        <button
                            className="data-table-action-btn edit"
                            onClick={(e) => { e.stopPropagation(); handleAssign(row) }}
                            title="Assign Advisor"
                        >
                            <UserPlus size={16} />
                        </button>
                    )}
                </div>
            )
        }
    ]

    const assignModalFooter = (
        <>
            <button
                className="btn btn-secondary"
                onClick={() => setAssignModal({ open: false, visit: null })}
            >
                Cancel
            </button>
            <button
                className="btn btn-primary"
                onClick={confirmAssign}
                disabled={!selectedAdvisor}
            >
                Assign Advisor
            </button>
        </>
    )

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Site Visits"
                description="Manage site visit requests and assignments"
            />

            <div className="card">
                <DataTable
                    columns={columns}
                    data={visits}
                    searchPlaceholder="Search site visits..."
                    onRowClick={(row) => navigate(`/admin/site-visits/${row.id}`)}
                />
            </div>

            {/* Assign Modal */}
            <Modal
                isOpen={assignModal.open}
                onClose={() => setAssignModal({ open: false, visit: null })}
                title="Assign Advisor to Site Visit"
                footer={assignModalFooter}
                size="small"
            >
                <div className="assign-modal-content">
                    <p className="assign-modal-lead">
                        Site visit for: <strong>{assignModal.visit?.customer}</strong>
                    </p>
                    <p className="text-sm text-muted mb-4">
                        {assignModal.visit?.project} - {assignModal.visit?.date} at {assignModal.visit?.time}
                    </p>
                    <div className="form-group">
                        <label className="form-label">Select Advisor</label>
                        <select
                            className="form-select"
                            value={selectedAdvisor}
                            onChange={(e) => setSelectedAdvisor(e.target.value)}
                        >
                            <option value="">Choose an advisor...</option>
                            {mockAdvisors.map(advisor => (
                                <option key={advisor.id} value={advisor.id}>
                                    {advisor.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AdminSiteVisits
