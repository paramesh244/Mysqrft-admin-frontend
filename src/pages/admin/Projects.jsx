import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Edit2, Eye, Power } from 'lucide-react'
import { PageHeader, DataTable, StatusBadge, ConfirmModal } from '../../components/common'

/**
 * Admin Projects List Page
 * Displays all projects with actions to add, edit, and deactivate
 */

// Mock data
const mockProjects = [
    { id: 1, name: 'Green Valley Heights', location: 'Whitefield, Bangalore', type: '3BHK Apartments', units: 120, available: 45, status: 'active', price: '₹85L - ₹1.2Cr' },
    { id: 2, name: 'Sunset Towers', location: 'Koramangala, Bangalore', type: '2BHK, 3BHK', units: 80, available: 12, status: 'active', price: '₹65L - ₹95L' },
    { id: 3, name: 'Metro Square', location: 'Electronic City', type: 'Commercial', units: 200, available: 78, status: 'active', price: '₹45L - ₹2Cr' },
    { id: 4, name: 'Ocean View Residency', location: 'Sarjapur Road', type: 'Villas', units: 50, available: 8, status: 'active', price: '₹1.5Cr - ₹3Cr' },
    { id: 5, name: 'Heritage Homes', location: 'HSR Layout', type: '2BHK, 3BHK', units: 100, available: 0, status: 'sold_out', price: '₹75L - ₹1.1Cr' },
    { id: 6, name: 'Sky Gardens', location: 'Marathahalli', type: 'Penthouse', units: 30, available: 5, status: 'upcoming', price: '₹2Cr - ₹4Cr' }
]

function AdminProjects() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState(mockProjects)
    const [confirmModal, setConfirmModal] = useState({ open: false, project: null })

    const handleDeactivate = (project) => {
        setConfirmModal({ open: true, project })
    }

    const confirmDeactivate = () => {
        // TODO: Call API to deactivate
        setProjects(prev =>
            prev.map(p =>
                p.id === confirmModal.project?.id
                    ? { ...p, status: 'inactive' }
                    : p
            )
        )
        setConfirmModal({ open: false, project: null })
    }

    const columns = [
        {
            header: 'Project Name',
            accessor: 'name',
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-medium">{row.name}</span>
                    <span className="text-xs text-muted">{row.location}</span>
                </div>
            )
        },
        {
            header: 'Type',
            accessor: 'type'
        },
        {
            header: 'Units',
            accessor: 'units',
            render: (row) => (
                <span>{row.available} / {row.units} available</span>
            )
        },
        {
            header: 'Price Range',
            accessor: 'price'
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
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/projects/${row.id}/edit`) }}
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        className="data-table-action-btn edit"
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/projects/${row.id}/edit`) }}
                        title="Edit Project"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        className="data-table-action-btn delete"
                        onClick={(e) => { e.stopPropagation(); handleDeactivate(row) }}
                        title="Deactivate Project"
                        disabled={row.status === 'inactive'}
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
                title="Projects"
                description="Manage all real estate projects"
                actions={
                    <Link to="/admin/projects/add" className="btn btn-primary">
                        <Plus size={18} />
                        Add Project
                    </Link>
                }
            />

            <div className="card">
                <DataTable
                    columns={columns}
                    data={projects}
                    searchPlaceholder="Search projects..."
                    onRowClick={(row) => navigate(`/admin/projects/${row.id}/edit`)}
                />
            </div>

            <ConfirmModal
                isOpen={confirmModal.open}
                onClose={() => setConfirmModal({ open: false, project: null })}
                onConfirm={confirmDeactivate}
                title="Deactivate Project"
                message={`Are you sure you want to deactivate "${confirmModal.project?.name}"? This will hide the project from public listings.`}
                confirmText="Deactivate"
                variant="warning"
            />
        </div>
    )
}

export default AdminProjects
