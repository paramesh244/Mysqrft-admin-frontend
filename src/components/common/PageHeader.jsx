import './PageHeader.css'

/**
 * Page Header Component
 * Consistent header for all pages with title, description, and actions
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Optional page description
 * @param {React.ReactNode} props.actions - Optional action buttons
 * @param {React.ReactNode} props.breadcrumb - Optional breadcrumb navigation
 */
function PageHeader({ title, description, actions, breadcrumb }) {
    return (
        <div className="page-header">
            {breadcrumb && (
                <div className="page-header-breadcrumb">
                    {breadcrumb}
                </div>
            )}

            <div className="page-header-content">
                <div className="page-header-text">
                    <h1 className="page-header-title">{title}</h1>
                    {description && (
                        <p className="page-header-description">{description}</p>
                    )}
                </div>

                {actions && (
                    <div className="page-header-actions">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PageHeader
