import './Loader.css'

/**
 * Loader Component
 * Displays a loading spinner with optional text
 * 
 * @param {Object} props
 * @param {string} props.size - Size variant: 'small', 'medium', 'large'
 * @param {string} props.text - Optional loading text
 */
function Loader({ size = 'medium', text }) {
    const sizeClass = `loader-${size}`

    return (
        <div className="loader-wrapper">
            <div className={`loader-spinner ${sizeClass}`}>
                <div className="loader-circle"></div>
            </div>
            {text && <p className="loader-text">{text}</p>}
        </div>
    )
}

export default Loader
