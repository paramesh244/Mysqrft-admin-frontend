import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChevronRight, Save } from 'lucide-react'
import { PageHeader, Loader } from '../../components/common'
import './ProjectForm.css'

/**
 * Admin Edit Project Page
 * Form to edit an existing project
 */

// Mock project data
const mockProject = {
    id: 1,
    name: 'Green Valley Heights',
    location: 'Whitefield, Bangalore',
    type: 'apartment',
    description: 'Premium 3BHK apartments in the heart of IT hub with world-class amenities.',
    totalUnits: '120',
    priceMin: '85,00,000',
    priceMax: '1,20,00,000',
    amenities: 'Swimming pool, Gym, Club house, Tennis court, Children play area',
    status: 'active'
}

function AdminProjectEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        type: '',
        description: '',
        totalUnits: '',
        priceMin: '',
        priceMax: '',
        amenities: '',
        status: 'active'
    })

    useEffect(() => {
        // TODO: Fetch project by ID from API
        setTimeout(() => {
            setFormData(mockProject)
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

        // TODO: Call API to update project
        console.log('Updating project:', formData)

        setTimeout(() => {
            setSaving(false)
            navigate('/admin/projects')
        }, 1000)
    }

    const breadcrumb = (
        <>
            <Link to="/admin/projects">Projects</Link>
            <ChevronRight size={16} />
            <span>Edit</span>
        </>
    )

    if (loading) {
        return <Loader size="large" text="Loading project..." />
    }

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Edit Project"
                description={`Editing: ${formData.name}`}
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
                                <option value="sold_out">Sold Out</option>
                                <option value="inactive">Inactive</option>
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

export default AdminProjectEdit
