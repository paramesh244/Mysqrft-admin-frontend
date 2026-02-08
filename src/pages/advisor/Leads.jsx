import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, MessageSquare, Phone, Mail } from 'lucide-react'
import { PageHeader, DataTable, StatusBadge } from '../../components/common'
import '../admin/Leads.css'

/**
 * Advisor Leads Page
 * View assigned leads
 */

// Mock data - only assigned leads
const mockLeads = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', project: 'Green Valley Heights', interest: 'high', status: 'contacted', lastContact: '2 hours ago' },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 87654 32109', project: 'Sunset Towers', interest: 'medium', status: 'interested', lastContact: '1 day ago' },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', phone: '+91 76543 21098', project: 'Metro Square', interest: 'high', status: 'contacted', lastContact: '3 days ago' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@email.com', phone: '+91 65432 10987', project: 'Ocean View', interest: 'low', status: 'new', lastContact: '-' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 54321 09876', project: 'Green Valley Heights', interest: 'medium', status: 'interested', lastContact: '5 days ago' }
]

function AdvisorLeads() {
    const navigate = useNavigate()
    const [leads] = useState(mockLeads)

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
            header: 'Last Contact',
            accessor: 'lastContact'
        },
        {
            header: 'Actions',
            width: '100px',
            render: (row) => (
                <div className="data-table-actions">
                    <button
                        className="data-table-action-btn view"
                        onClick={(e) => { e.stopPropagation(); navigate(`/advisor/leads/${row.id}`) }}
                        title="View Details"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        className="data-table-action-btn edit"
                        onClick={(e) => { e.stopPropagation(); navigate(`/advisor/leads/${row.id}`) }}
                        title="Add Remark"
                    >
                        <MessageSquare size={16} />
                    </button>
                </div>
            )
        }
    ]

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="My Leads"
                description="View and manage your assigned leads"
            />

            <div className="card">
                <DataTable
                    columns={columns}
                    data={leads}
                    searchPlaceholder="Search leads..."
                    onRowClick={(row) => navigate(`/advisor/leads/${row.id}`)}
                />
            </div>
        </div>
    )
}

export default AdvisorLeads
