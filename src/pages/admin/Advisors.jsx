import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit2, Eye, Power, TrendingUp } from 'lucide-react'
import { PageHeader, DataTable, StatusBadge, ConfirmModal } from '../../components/common'
import './Advisors.css'

/**
 * Admin Advisors Page
 * View all advisors and their performance summary
 */

// Mock data
const mockAdvisors = [
    { id: 1, name: 'Vijay Kumar', email: 'vijay@squarefeet.com', phone: '+91 99999 88888', assignedLeads: 25, completedVisits: 18, conversion: '32%', status: 'active' },
    { id: 2, name: 'Neha Singh', email: 'neha@squarefeet.com', phone: '+91 99999 77777', assignedLeads: 20, completedVisits: 15, conversion: '28%', status: 'active' },
    { id: 3, name: 'Rajesh Gupta', email: 'rajesh@squarefeet.com', phone: '+91 99999 66666', assignedLeads: 18, completedVisits: 12, conversion: '35%', status: 'active' },
    { id: 4, name: 'Priyanka Sharma', email: 'priyanka@squarefeet.com', phone: '+91 99999 55555', assignedLeads: 15, completedVisits: 10, conversion: '25%', status: 'active' },
    { id: 5, name: 'Amit Patel', email: 'amit@squarefeet.com', phone: '+91 99999 44444', assignedLeads: 10, completedVisits: 5, conversion: '20%', status: 'inactive' }
]

function AdminAdvisors() {
    const navigate = useNavigate()
    const [advisors, setAdvisors] = useState(mockAdvisors)
    const [confirmModal, setConfirmModal] = useState({ open: false, advisor: null })

    const handleDeactivate = (advisor) => {
        setConfirmModal({ open: true, advisor })
    }

    const confirmDeactivate = () => {
        setAdvisors(prev =>
            prev.map(a =>
                a.id === confirmModal.advisor?.id
                    ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' }
                    : a
            )
        )
        setConfirmModal({ open: false, advisor: null })
    }

    const columns = [
        {
            header: 'Advisor',
            accessor: 'name',
            render: (row) => (
                <div className="advisor-info">
                    <div className="advisor-avatar">{row.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className="advisor-details">
                        <span className="advisor-name">{row.name}</span>
                        <span className="advisor-email">{row.email}</span>
                    </div>
                </div>
            )
        },
        {
            header: 'Phone',
            accessor: 'phone'
        },
        {
            header: 'Assigned Leads',
            accessor: 'assignedLeads',
            render: (row) => (
                <span className="advisor-stat">{row.assignedLeads}</span>
            )
        },
        {
            header: 'Completed Visits',
            accessor: 'completedVisits',
            render: (row) => (
                <span className="advisor-stat">{row.completedVisits}</span>
            )
        },
        {
            header: 'Conversion',
            accessor: 'conversion',
            render: (row) => (
                <span className="advisor-conversion">
                    <TrendingUp size={14} />
                    {row.conversion}
                </span>
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
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/advisors/${row.id}/edit`) }}
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        className="data-table-action-btn edit"
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/advisors/${row.id}/edit`) }}
                        title="Edit Advisor"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        className="data-table-action-btn delete"
                        onClick={(e) => { e.stopPropagation(); handleDeactivate(row) }}
                        title={row.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                        <Power size={16} />
                    </button>
                </div>
            )
        }
    ]

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Advisors"
                description="Manage advisors and view performance"
                actions={
                    <Link to="/admin/advisors/add" className="btn btn-primary">
                        <Plus size={18} />
                        Add Advisor
                    </Link>
                }
            />

            <div className="card">
                <DataTable
                    columns={columns}
                    data={advisors}
                    searchPlaceholder="Search advisors..."
                    onRowClick={(row) => navigate(`/admin/advisors/${row.id}/edit`)}
                />
            </div>

            <ConfirmModal
                isOpen={confirmModal.open}
                onClose={() => setConfirmModal({ open: false, advisor: null })}
                onConfirm={confirmDeactivate}
                title={confirmModal.advisor?.status === 'active' ? 'Deactivate Advisor' : 'Activate Advisor'}
                message={`Are you sure you want to ${confirmModal.advisor?.status === 'active' ? 'deactivate' : 'activate'} ${confirmModal.advisor?.name}?`}
                confirmText={confirmModal.advisor?.status === 'active' ? 'Deactivate' : 'Activate'}
                variant={confirmModal.advisor?.status === 'active' ? 'warning' : 'warning'}
            />
        </div>
    )
}

export default AdminAdvisors
