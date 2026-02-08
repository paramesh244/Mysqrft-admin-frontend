import './StatusBadge.css'

/**
 * Status Badge Component
 * Visual indicator for various status types
 * 
 * @param {Object} props
 * @param {string} props.status - Status text to display
 * @param {string} props.variant - Color variant (auto-detected if not provided)
 */

// Status to variant mapping
const STATUS_VARIANTS = {
    // Site Visit statuses
    'requested': 'warning',
    'assigned': 'info',
    'confirmed': 'info',
    'completed': 'success',
    'cancelled': 'error',

    // Lead statuses
    'new': 'info',
    'contacted': 'warning',
    'interested': 'success',
    'not_interested': 'neutral',
    'converted': 'success',

    // Interest levels
    'high': 'success',
    'medium': 'warning',
    'low': 'neutral',

    // Project statuses
    'active': 'success',
    'inactive': 'neutral',
    'upcoming': 'info',
    'sold_out': 'error',

    // General
    'pending': 'warning',
    'approved': 'success',
    'rejected': 'error'
}

function StatusBadge({ status, variant }) {
    // Normalize status for lookup
    const normalizedStatus = status?.toLowerCase().replace(/\s+/g, '_') || ''

    // Determine variant (provided or auto-detected)
    const badgeVariant = variant || STATUS_VARIANTS[normalizedStatus] || 'neutral'

    // Format display text
    const displayText = status?.replace(/_/g, ' ') || 'Unknown'

    return (
        <span className={`status-badge status-badge-${badgeVariant}`}>
            <span className="status-badge-dot"></span>
            {displayText}
        </span>
    )
}

export default StatusBadge
