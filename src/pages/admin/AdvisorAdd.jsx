import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Save } from 'lucide-react'
import { PageHeader } from '../../components/common'
import './Advisors.css'
import './ProjectForm.css'

/**
 * Admin Add Advisor Page
 */
function AdminAdvisorAdd() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        specialization: '',
        experience: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // TODO: Call API to create advisor
        console.log('Creating advisor:', formData)

        setTimeout(() => {
            setLoading(false)
            navigate('/admin/advisors')
        }, 1000)
    }

    const breadcrumb = (
        <>
            <Link to="/admin/advisors">Advisors</Link>
            <ChevronRight size={16} />
            <span>Add New</span>
        </>
    )

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Add New Advisor"
                description="Create a new advisor account"
                breadcrumb={breadcrumb}
            />

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
                                placeholder="e.g. John Doe"
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
                                placeholder="e.g. john@squarefeet.com"
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
                                placeholder="e.g. +91 99999 88888"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password *</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-input"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
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
                                placeholder="e.g. 5"
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
                            disabled={loading}
                        >
                            <Save size={18} />
                            {loading ? 'Creating...' : 'Create Advisor'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminAdvisorAdd
