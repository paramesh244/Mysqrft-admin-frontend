import { AlertTriangle, Trash2 } from 'lucide-react'
import Modal from './Modal'

/**
 * Confirm Modal Component
 * Specialized modal for confirmation dialogs (delete, assign, etc.)
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onConfirm - Confirm action handler
 * @param {string} props.title - Modal title
 * @param {string} props.message - Confirmation message
 * @param {string} props.confirmText - Text for confirm button
 * @param {string} props.variant - Variant: 'warning', 'danger'
 * @param {boolean} props.loading - Loading state for confirm button
 */
function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    confirmText = 'Confirm',
    variant = 'warning',
    loading = false
}) {
    const IconComponent = variant === 'danger' ? Trash2 : AlertTriangle

    const handleConfirm = () => {
        onConfirm()
    }

    const footer = (
        <>
            <button
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
            >
                Cancel
            </button>
            <button
                className={`btn ${variant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
                onClick={handleConfirm}
                disabled={loading}
            >
                {loading ? 'Processing...' : confirmText}
            </button>
        </>
    )

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            footer={footer}
            size="small"
        >
            <div className="confirm-modal-content">
                <div className={`confirm-modal-icon ${variant}`}>
                    <IconComponent size={28} />
                </div>
                <p className="confirm-modal-message">{message}</p>
            </div>
        </Modal>
    )
}

export default ConfirmModal
