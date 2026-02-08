import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Save } from 'lucide-react'
import { PageHeader } from '../../components/common'
import './ProjectForm.css'

/**
 * Admin Add Project Page
 * Form to create a new project
 */
function AdminProjectAdd() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        type: '',
        description: '',
        totalUnits: '',
        priceMin: '',
        priceMax: '',
        amenities: '',
        status: 'upcoming'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // TODO: Call API to create project
        console.log('Creating project:', formData)

        setTimeout(() => {
            setLoading(false)
            navigate('/admin/projects')
        }, 1000)
    }

    const breadcrumb = (
        <>
            <Link to="/admin/projects">Projects</Link>
            <ChevronRight size={16} />
            <span>Add New</span>
        </>
    )

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Add New Project"
                description="Create a new real estate project"
                breadcrumb={breadcrumb}
            />

            <div className="card">
                <form onSubmit={handleSubmit} className="project-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Project Name *</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Green Valley Heights"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="location">Location *</label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                className="form-input"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Whitefield, Bangalore"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="type">Property Type *</label>
                            <select
                                id="type"
                                name="type"
                                className="form-select"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select type</option>
                                <option value="apartment">Apartment</option>
                                <option value="villa">Villa</option>
                                <option value="plot">Plot</option>
                                <option value="commercial">Commercial</option>
                                <option value="penthouse">Penthouse</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="totalUnits">Total Units *</label>
                            <input
                                id="totalUnits"
                                name="totalUnits"
                                type="number"
                                className="form-input"
                                value={formData.totalUnits}
                                onChange={handleChange}
                                placeholder="e.g. 120"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="priceMin">Minimum Price (₹)</label>
                            <input
                                id="priceMin"
                                name="priceMin"
                                type="text"
                                className="form-input"
                                value={formData.priceMin}
                                onChange={handleChange}
                                placeholder="e.g. 50,00,000"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="priceMax">Maximum Price (₹)</label>
                            <input
                                id="priceMax"
                                name="priceMax"
                                type="text"
                                className="form-input"
                                value={formData.priceMax}
                                onChange={handleChange}
                                placeholder="e.g. 1,20,00,000"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="form-select"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="upcoming">Upcoming</option>
                                <option value="active">Active</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group form-group-full">
                        <label className="form-label" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-textarea"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the project features, location benefits, etc."
                            rows={4}
                        />
                    </div>

                    <div className="form-group form-group-full">
                        <label className="form-label" htmlFor="amenities">Amenities</label>
                        <textarea
                            id="amenities"
                            name="amenities"
                            className="form-textarea"
                            value={formData.amenities}
                            onChange={handleChange}
                            placeholder="Swimming pool, Gym, Club house, etc. (comma separated)"
                            rows={2}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/admin/projects')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminProjectAdd
