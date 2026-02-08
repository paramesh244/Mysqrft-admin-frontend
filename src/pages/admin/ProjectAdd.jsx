import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Save } from 'lucide-react'
import { PageHeader } from '../../components/common'
import './ProjectForm.css'

/**
 * Admin Add Project Page
 * Comprehensive form to create a new project with all property details
 */
function AdminProjectAdd() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('basic')

    const [formData, setFormData] = useState({
        // Basic Information
        name: '',
        location: '',
        type: '',
        description: '',
        totalUnits: '',
        status: 'upcoming',

        // Pricing
        priceMin: '',
        priceMax: '',
        securityDeposit: '',
        brokerage: '',
        priceNegotiable: 'no',

        // Property Details
        builtUpArea: '',
        carpetArea: '',
        floorNo: '',
        totalFloors: '',
        balcony: '',
        bathrooms: '',
        bedrooms: '',
        mainEntranceFacing: '',
        ageOfProperty: '',
        availableFrom: '',

        // Features
        furnishing: '',
        parking: '',
        gatedCommunity: 'no',
        gasPipeline: 'no',
        leaseType: '',

        // Furnishings & Amenities
        furnishingDetails: '',
        amenities: ''
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

    const tabs = [
        { id: 'basic', label: 'Basic Info' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'details', label: 'Property Details' },
        { id: 'features', label: 'Features & Amenities' }
    ]

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Add New Project"
                description="Create a new real estate project with complete details"
                breadcrumb={breadcrumb}
            />

            <div className="card">
                {/* Tab Navigation */}
                <div className="form-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`form-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="project-form">
                    {/* Basic Information Tab */}
                    {activeTab === 'basic' && (
                        <div className="form-section">
                            <h3 className="form-section-title">Basic Information</h3>
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
                                        <option value="independent_house">Independent House</option>
                                        <option value="plot">Plot</option>
                                        <option value="commercial">Commercial</option>
                                        <option value="penthouse">Penthouse</option>
                                        <option value="studio">Studio Apartment</option>
                                        <option value="builder_floor">Builder Floor</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="bedrooms">Bedrooms (BHK)</label>
                                    <select
                                        id="bedrooms"
                                        name="bedrooms"
                                        className="form-select"
                                        value={formData.bedrooms}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1 BHK</option>
                                        <option value="2">2 BHK</option>
                                        <option value="3">3 BHK</option>
                                        <option value="4">4 BHK</option>
                                        <option value="5">5 BHK</option>
                                        <option value="5+">5+ BHK</option>
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
                                        <option value="ready_to_move">Ready to Move</option>
                                        <option value="under_construction">Under Construction</option>
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
                                    placeholder="Describe the project features, location benefits, nearby landmarks, etc."
                                    rows={4}
                                />
                            </div>
                        </div>
                    )}

                    {/* Pricing Tab */}
                    {activeTab === 'pricing' && (
                        <div className="form-section">
                            <h3 className="form-section-title">Pricing Details</h3>
                            <div className="form-grid">
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
                                    <label className="form-label" htmlFor="securityDeposit">Security Deposit (₹)</label>
                                    <input
                                        id="securityDeposit"
                                        name="securityDeposit"
                                        type="text"
                                        className="form-input"
                                        value={formData.securityDeposit}
                                        onChange={handleChange}
                                        placeholder="e.g. 2,00,000"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="brokerage">Brokerage</label>
                                    <input
                                        id="brokerage"
                                        name="brokerage"
                                        type="text"
                                        className="form-input"
                                        value={formData.brokerage}
                                        onChange={handleChange}
                                        placeholder="e.g. 1 month rent or 2%"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="priceNegotiable">Price Negotiable?</label>
                                    <select
                                        id="priceNegotiable"
                                        name="priceNegotiable"
                                        className="form-select"
                                        value={formData.priceNegotiable}
                                        onChange={handleChange}
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Property Details Tab */}
                    {activeTab === 'details' && (
                        <div className="form-section">
                            <h3 className="form-section-title">Property Details</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="builtUpArea">Built-up Area (sq.ft)</label>
                                    <input
                                        id="builtUpArea"
                                        name="builtUpArea"
                                        type="text"
                                        className="form-input"
                                        value={formData.builtUpArea}
                                        onChange={handleChange}
                                        placeholder="e.g. 1500"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="carpetArea">Carpet Area (sq.ft)</label>
                                    <input
                                        id="carpetArea"
                                        name="carpetArea"
                                        type="text"
                                        className="form-input"
                                        value={formData.carpetArea}
                                        onChange={handleChange}
                                        placeholder="e.g. 1200"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="floorNo">Floor Number</label>
                                    <input
                                        id="floorNo"
                                        name="floorNo"
                                        type="text"
                                        className="form-input"
                                        value={formData.floorNo}
                                        onChange={handleChange}
                                        placeholder="e.g. 5 or Ground"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="totalFloors">Total Floors</label>
                                    <input
                                        id="totalFloors"
                                        name="totalFloors"
                                        type="number"
                                        className="form-input"
                                        value={formData.totalFloors}
                                        onChange={handleChange}
                                        placeholder="e.g. 12"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="bathrooms">Bathrooms</label>
                                    <select
                                        id="bathrooms"
                                        name="bathrooms"
                                        className="form-select"
                                        value={formData.bathrooms}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5+">5+</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="balcony">Balconies</label>
                                    <select
                                        id="balcony"
                                        name="balcony"
                                        className="form-select"
                                        value={formData.balcony}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="0">None</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4+">4+</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="mainEntranceFacing">Main Entrance Facing</label>
                                    <select
                                        id="mainEntranceFacing"
                                        name="mainEntranceFacing"
                                        className="form-select"
                                        value={formData.mainEntranceFacing}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="north">North</option>
                                        <option value="south">South</option>
                                        <option value="east">East</option>
                                        <option value="west">West</option>
                                        <option value="north_east">North-East</option>
                                        <option value="north_west">North-West</option>
                                        <option value="south_east">South-East</option>
                                        <option value="south_west">South-West</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="ageOfProperty">Age of Property</label>
                                    <select
                                        id="ageOfProperty"
                                        name="ageOfProperty"
                                        className="form-select"
                                        value={formData.ageOfProperty}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="new">New Construction</option>
                                        <option value="0-1">Less than 1 year</option>
                                        <option value="1-3">1-3 years</option>
                                        <option value="3-5">3-5 years</option>
                                        <option value="5-10">5-10 years</option>
                                        <option value="10+">More than 10 years</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="availableFrom">Available From</label>
                                    <input
                                        id="availableFrom"
                                        name="availableFrom"
                                        type="date"
                                        className="form-input"
                                        value={formData.availableFrom}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Features & Amenities Tab */}
                    {activeTab === 'features' && (
                        <div className="form-section">
                            <h3 className="form-section-title">Features & Amenities</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="furnishing">Furnishing Status</label>
                                    <select
                                        id="furnishing"
                                        name="furnishing"
                                        className="form-select"
                                        value={formData.furnishing}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="unfurnished">Unfurnished</option>
                                        <option value="semi_furnished">Semi-Furnished</option>
                                        <option value="fully_furnished">Fully Furnished</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="parking">Parking</label>
                                    <select
                                        id="parking"
                                        name="parking"
                                        className="form-select"
                                        value={formData.parking}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="none">No Parking</option>
                                        <option value="1_covered">1 Covered</option>
                                        <option value="2_covered">2 Covered</option>
                                        <option value="1_open">1 Open</option>
                                        <option value="2_open">2 Open</option>
                                        <option value="both">Covered + Open</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="gatedCommunity">Gated Community</label>
                                    <select
                                        id="gatedCommunity"
                                        name="gatedCommunity"
                                        className="form-select"
                                        value={formData.gatedCommunity}
                                        onChange={handleChange}
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="gasPipeline">Gas Pipeline</label>
                                    <select
                                        id="gasPipeline"
                                        name="gasPipeline"
                                        className="form-select"
                                        value={formData.gasPipeline}
                                        onChange={handleChange}
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="leaseType">Lease Type / Preferred Tenants</label>
                                    <select
                                        id="leaseType"
                                        name="leaseType"
                                        className="form-select"
                                        value={formData.leaseType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="family">Family Only</option>
                                        <option value="bachelor_male">Bachelor (Male)</option>
                                        <option value="bachelor_female">Bachelor (Female)</option>
                                        <option value="company">Company Lease</option>
                                        <option value="any">Any</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group form-group-full">
                                <label className="form-label" htmlFor="furnishingDetails">Furnishing Details</label>
                                <textarea
                                    id="furnishingDetails"
                                    name="furnishingDetails"
                                    className="form-textarea"
                                    value={formData.furnishingDetails}
                                    onChange={handleChange}
                                    placeholder="e.g. Modular Kitchen, 2 AC, 1 Geyser, 2 Beds, Wardrobes, Dining Table, Sofa Set, Washing Machine, Refrigerator, etc."
                                    rows={3}
                                />
                            </div>

                            <div className="form-group form-group-full">
                                <label className="form-label" htmlFor="amenities">Society/Building Amenities</label>
                                <textarea
                                    id="amenities"
                                    name="amenities"
                                    className="form-textarea"
                                    value={formData.amenities}
                                    onChange={handleChange}
                                    placeholder="e.g. Swimming Pool, Gym, Club House, Children's Play Area, 24x7 Security, Power Backup, Lift, Intercom, etc."
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}

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
