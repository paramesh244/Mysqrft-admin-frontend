import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChevronRight, Save } from 'lucide-react'
import { PageHeader, Loader } from '../../components/common'
import './Advisors.css'
import './ProjectForm.css'

/**
 * Admin Edit Advisor Page
 */

// Mock data
const mockAdvisor = {
    id: 1,
    name: 'Vijay Kumar',
    email: 'vijay@squarefeet.com',
    phone: '+91 99999 88888',
    specialization: 'residential',
    experience: '5',
    assignedLeads: 25,
    completedVisits: 18,
    conversion: '32%',
    status: 'active'
}

function AdminAdvisorEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        experience: ''
    })
    const [performance, setPerformance] = useState({
        assignedLeads: 0,
        completedVisits: 0,
        conversion: '0%'
    })

    useEffect(() => {
        // TODO: Fetch advisor by ID
        setTimeout(() => {
            setFormData({
                name: mockAdvisor.name,
                email: mockAdvisor.email,
                phone: mockAdvisor.phone,
                specialization: mockAdvisor.specialization,
                experience: mockAdvisor.experience
            })
            setPerformance({
                assignedLeads: mockAdvisor.assignedLeads,
                completedVisits: mockAdvisor.completedVisits,
                conversion: mockAdvisor.conversion
            })
            setLoading(false)
        }, 500)
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        // TODO: Call API to update advisor
        console.log('Updating advisor:', formData)

        setTimeout(() => {
            setSaving(false)
            navigate('/admin/advisors')
        }, 1000)
    }

    const breadcrumb = (
        <>
            <Link to="/admin/advisors">Advisors</Link>
            <ChevronRight size={16} />
            <span>Edit</span>
        </>
    )

    if (loading) {
        return <Loader size="large" text="Loading advisor..." />
    }

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Edit Advisor"
                description={`Editing: ${formData.name}`}
                breadcrumb={breadcrumb}
            />

            {/* Performance Summary */}
            <div className="performance-grid">
                <div className="performance-card primary">
                    <div className="performance-card-value">{performance.assignedLeads}</div>
                    <div className="performance-card-label">Assigned Leads</div>
                </div>
                <div className="performance-card success">
                    <div className="performance-card-value">{performance.completedVisits}</div>
                    <div className="performance-card-label">Completed Visits</div>
                </div>
                <div className="performance-card warning">
                    <div className="performance-card-value">{performance.conversion}</div>
                    <div className="performance-card-label">Conversion Rate</div>
                </div>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} className="advisor-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Full Name *</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email Address *</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="phone">Phone Number *</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className="form-input"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="specialization">Specialization</label>
                            <select
                                id="specialization"
                                name="specialization"
                                className="form-select"
                                value={formData.specialization}
                                onChange={handleChange}
                            >
                                <option value="">Select specialization</option>
                                <option value="residential">Residential Properties</option>
                                <option value="commercial">Commercial Properties</option>
                                <option value="luxury">Luxury/Premium</option>
                                <option value="plots">Plots & Land</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="experience">Experience (Years)</label>
                            <input
                                id="experience"
                                name="experience"
                                type="number"
                                className="form-input"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/admin/advisors')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                        >
                            <Save size={18} />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminAdvisorEdit
