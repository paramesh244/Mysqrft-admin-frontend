import { useState, useEffect } from 'react'
import { User, Mail, Phone, Briefcase, Save } from 'lucide-react'
import { PageHeader, Loader } from '../../components/common'
import '../admin/Advisors.css'
import './Profile.css'

/**
 * Advisor Profile Page
 * View and edit profile, view performance stats
 */

// Mock data
const mockProfile = {
    id: 1,
    name: 'Vijay Kumar',
    email: 'vijay@squarefeet.com',
    phone: '+91 99999 88888',
    specialization: 'Residential Properties',
    experience: '5 years',
    joinedDate: 'Jan 2020'
}

const mockPerformance = {
    totalLeads: 150,
    activeLeads: 25,
    completedVisits: 85,
    conversions: 28,
    conversionRate: '32%',
    thisMonthVisits: 12,
    thisMonthConversions: 4
}

function AdvisorProfile() {
    const [profile, setProfile] = useState(null)
    const [performance, setPerformance] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setProfile(mockProfile)
            setPerformance(mockPerformance)
            setFormData(mockProfile)
            setLoading(false)
        }, 500)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaving(true)
        // TODO: Call API
        setTimeout(() => {
            setProfile(formData)
            setEditing(false)
            setSaving(false)
        }, 500)
    }

    if (loading) {
        return <Loader size="large" text="Loading profile..." />
    }

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="My Profile"
                description="View your profile and performance"
                actions={
                    !editing && (
                        <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                            Edit Profile
                        </button>
                    )
                }
            />

            {/* Performance Summary */}
            <div className="profile-performance">
                <h3 className="profile-section-title">Performance Summary</h3>
                <div className="performance-grid">
                    <div className="performance-card primary">
                        <div className="performance-card-value">{performance.totalLeads}</div>
                        <div className="performance-card-label">Total Leads</div>
                    </div>
                    <div className="performance-card">
                        <div className="performance-card-value">{performance.activeLeads}</div>
                        <div className="performance-card-label">Active Leads</div>
                    </div>
                    <div className="performance-card success">
                        <div className="performance-card-value">{performance.completedVisits}</div>
                        <div className="performance-card-label">Completed Visits</div>
                    </div>
                    <div className="performance-card warning">
                        <div className="performance-card-value">{performance.conversions}</div>
                        <div className="performance-card-label">Conversions</div>
                    </div>
                    <div className="performance-card info">
                        <div className="performance-card-value">{performance.conversionRate}</div>
                        <div className="performance-card-label">Conversion Rate</div>
                    </div>
                </div>
            </div>

            {/* Profile Card */}
            <div className="card profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="profile-info">
                        <h2>{profile.name}</h2>
                        <p className="text-muted">Advisor since {profile.joinedDate}</p>
                    </div>
                </div>

                {editing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => { setEditing(false); setFormData(profile) }}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                <Save size={18} />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-details">
                        <div className="profile-detail-item">
                            <Mail size={18} />
                            <div>
                                <span className="detail-label">Email</span>
                                <span className="detail-value">{profile.email}</span>
                            </div>
                        </div>
                        <div className="profile-detail-item">
                            <Phone size={18} />
                            <div>
                                <span className="detail-label">Phone</span>
                                <span className="detail-value">{profile.phone}</span>
                            </div>
                        </div>
                        <div className="profile-detail-item">
                            <Briefcase size={18} />
                            <div>
                                <span className="detail-label">Specialization</span>
                                <span className="detail-value">{profile.specialization}</span>
                            </div>
                        </div>
                        <div className="profile-detail-item">
                            <User size={18} />
                            <div>
                                <span className="detail-label">Experience</span>
                                <span className="detail-value">{profile.experience}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* This Month Stats */}
            <div className="card">
                <h3 className="card-title mb-4">This Month</h3>
                <div className="this-month-stats">
                    <div className="stat-item">
                        <span className="stat-value">{performance.thisMonthVisits}</span>
                        <span className="stat-label">Site Visits</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{performance.thisMonthConversions}</span>
                        <span className="stat-label">Conversions</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvisorProfile
