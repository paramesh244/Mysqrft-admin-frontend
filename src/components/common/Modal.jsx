import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './Modal.css'

/**
 * Modal Component
 * Reusable modal dialog with header, body, and footer sections
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal body content
 * @param {React.ReactNode} props.footer - Optional footer content
 * @param {string} props.size - Size variant: 'small', 'medium', 'large'
 */
function Modal({ isOpen, onClose, title, children, footer, size = 'medium' }) {
    const modalRef = useRef(null)

    // Handle escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div
                ref={modalRef}
                className={`modal-container modal-${size}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Header */}
                <div className="modal-header">
                    <h3 id="modal-title" className="modal-title">{title}</h3>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal
