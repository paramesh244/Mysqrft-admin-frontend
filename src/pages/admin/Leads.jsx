import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus, Eye, Phone, Mail } from 'lucide-react'
import { PageHeader, DataTable, StatusBadge, Modal } from '../../components/common'
import './Leads.css'

/**
 * Admin Leads Page
 * View all leads and assign them to advisors
 */

// Mock data
const mockLeads = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', project: 'Green Valley Heights', interest: 'high', status: 'new', advisor: null, createdAt: '2024-01-20' },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 87654 32109', project: 'Sunset Towers', interest: 'medium', status: 'contacted', advisor: 'Vijay Kumar', createdAt: '2024-01-19' },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', phone: '+91 76543 21098', project: 'Metro Square', interest: 'high', status: 'interested', advisor: 'Neha Singh', createdAt: '2024-01-18' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@email.com', phone: '+91 65432 10987', project: 'Ocean View', interest: 'low', status: 'new', advisor: null, createdAt: '2024-01-17' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876', project: 'Green Valley Heights', interest: 'medium', status: 'contacted', advisor: 'Vijay Kumar', createdAt: '2024-01-16' },
    { id: 6, name: 'Anjali Nair', email: 'anjali@email.com', phone: '+91 43210 98765', project: 'Sky Gardens', interest: 'high', status: 'interested', advisor: 'Neha Singh', createdAt: '2024-01-15' }
]

const mockAdvisors = [
    { id: 1, name: 'Vijay Kumar' },
    { id: 2, name: 'Neha Singh' },
    { id: 3, name: 'Rajesh Gupta' },
    { id: 4, name: 'Priyanka Sharma' }
]

function AdminLeads() {
    const navigate = useNavigate()
    const [leads, setLeads] = useState(mockLeads)
    const [assignModal, setAssignModal] = useState({ open: false, lead: null })
    const [selectedAdvisor, setSelectedAdvisor] = useState('')

    const handleAssign = (lead) => {
        setAssignModal({ open: true, lead })
        setSelectedAdvisor('')
    }

    const confirmAssign = () => {
        if (!selectedAdvisor) return

        const advisor = mockAdvisors.find(a => a.id === parseInt(selectedAdvisor))
        setLeads(prev =>
            prev.map(l =>
                l.id === assignModal.lead?.id
                    ? { ...l, advisor: advisor?.name, status: l.status === 'new' ? 'contacted' : l.status }
                    : l
            )
        )
        setAssignModal({ open: false, lead: null })
    }

    const columns = [
        {
            header: 'Lead',
            accessor: 'name',
            render: (row) => (
                <div className="lead-info">
                    <div className="lead-avatar">{row.name.charAt(0)}</div>
                    <div className="lead-details">
                        <span className="lead-name">{row.name}</span>
                        <span className="lead-contact">
                            <Mail size={12} /> {row.email}
                        </span>
                    </div>
                </div>
            )
        },
        {
            header: 'Phone',
            accessor: 'phone',
            render: (row) => (
                <span className="lead-phone">
                    <Phone size={14} /> {row.phone}
                </span>
            )
        },
        {
            header: 'Project',
            accessor: 'project'
        },
        {
            header: 'Interest',
            accessor: 'interest',
            render: (row) => <StatusBadge status={row.interest} />
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
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/leads/${row.id}`) }}
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        className="data-table-action-btn edit"
                        onClick={(e) => { e.stopPropagation(); handleAssign(row) }}
                        title="Assign Advisor"
                    >
                        <UserPlus size={16} />
                    </button>
                </div>
            )
        }
    ]

    const assignModalFooter = (
        <>
            <button
                className="btn btn-secondary"
                onClick={() => setAssignModal({ open: false, lead: null })}
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
                title="Leads"
                description="Manage and assign leads to advisors"
            />

            <div className="card">
                <DataTable
                    columns={columns}
                    data={leads}
                    searchPlaceholder="Search leads..."
                    onRowClick={(row) => navigate(`/admin/leads/${row.id}`)}
                />
            </div>

            {/* Assign Advisor Modal */}
            <Modal
                isOpen={assignModal.open}
                onClose={() => setAssignModal({ open: false, lead: null })}
                title="Assign Advisor"
                footer={assignModalFooter}
                size="small"
            >
                <div className="assign-modal-content">
                    <p className="assign-modal-lead">
                        Assigning advisor for: <strong>{assignModal.lead?.name}</strong>
                    </p>
                    <div className="form-group">
                        <label className="form-label" htmlFor="advisor">Select Advisor</label>
                        <select
                            id="advisor"
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

export default AdminLeads
