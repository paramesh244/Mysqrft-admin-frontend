import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import './Login.css'

/**
 * Advisor Login Page
 * Handles advisor authentication
 */
function AdvisorLogin() {
    const navigate = useNavigate()
    const { login, isAuthenticated, user } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Redirect if already authenticated as advisor
    if (isAuthenticated && user?.role === 'ADVISOR') {
        navigate('/advisor/dashboard')
        return null
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login({
                email: formData.email,
                password: formData.password,
                role: 'ADVISOR'
            })
            navigate('/advisor/dashboard')
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Left side - Branding */}
                <div className="login-branding advisor">
                    <div className="login-branding-content">
                        <div className="login-logo">
                            <User size={48} />
                        </div>
                        <h1 className="login-brand-title">SquareFeet</h1>
                        <p className="login-brand-subtitle">Advisor Portal</p>
                        <p className="login-brand-description">
                            Manage your leads, schedule site visits, and track
                            your performance all in one place.
                        </p>
                    </div>
                    <div className="login-branding-decoration"></div>
                </div>

                {/* Right side - Login Form */}
                <div className="login-form-section">
                    <div className="login-form-container">
                        <div className="login-form-header">
                            <h2>Advisor Sign In</h2>
                            <p>Access your advisor dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            {error && (
                                <div className="login-error">
                                    {error}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="login-input-wrapper">
                                    <Mail size={18} className="login-input-icon" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-input login-input"
                                        placeholder="advisor@squarefeet.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                                <div className="login-input-wrapper">
                                    <Lock size={18} className="login-input-icon" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-input login-input"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg login-submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>
                                Are you an admin?{' '}
                                <Link to="/admin/login">Sign in here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvisorLogin
