import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import './DataTable.css'

/**
 * DataTable Component
 * Feature-rich table with search, pagination, and custom actions
 * 
 * @param {Object} props
 * @param {Array} props.columns - Column definitions
 * @param {Array} props.data - Table data
 * @param {Function} props.onRowClick - Row click handler
 * @param {boolean} props.loading - Loading state
 * @param {string} props.emptyMessage - Message when no data
 * @param {number} props.pageSize - Items per page (default: 10)
 * @param {boolean} props.searchable - Enable search (default: true)
 * @param {string} props.searchPlaceholder - Search input placeholder
 */
function DataTable({
    columns = [],
    data = [],
    onRowClick,
    loading = false,
    emptyMessage = 'No data available',
    pageSize = 10,
    searchable = true,
    searchPlaceholder = 'Search...'
}) {
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Filter data based on search query
    const filteredData = useMemo(() => {
        if (!searchQuery.trim()) return data

        const query = searchQuery.toLowerCase()
        return data.filter(row => {
            return columns.some(col => {
                const value = col.accessor ? row[col.accessor] : null
                if (value === null || value === undefined) return false
                return String(value).toLowerCase().includes(query)
            })
        })
    }, [data, columns, searchQuery])

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredData.slice(startIndex, endIndex)

    // Reset to first page when search changes
    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1)
    }

    // Pagination handlers
    const goToPage = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    // Render cell value
    const renderCell = (row, column) => {
        if (column.render) {
            return column.render(row)
        }

        const value = column.accessor ? row[column.accessor] : null
        return value ?? '-'
    }

    return (
        <div className="data-table-wrapper">
            {/* Search bar */}
            {searchable && (
                <div className="data-table-toolbar">
                    <div className="data-table-search">
                        <Search size={18} className="data-table-search-icon" />
                        <input
                            type="text"
                            className="data-table-search-input"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="data-table-info">
                        <span className="text-sm text-muted">
                            {filteredData.length} {filteredData.length === 1 ? 'item' : 'items'}
                        </span>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="table-container">
                <table className="table data-table">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={column.accessor || index}
                                    style={{ width: column.width }}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="data-table-loading">
                                    <div className="data-table-loading-content">
                                        <div className="data-table-loading-spinner"></div>
                                        <span>Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="data-table-empty">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    onClick={() => onRowClick?.(row)}
                                    className={onRowClick ? 'data-table-row-clickable' : ''}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td key={column.accessor || colIndex}>
                                            {renderCell(row, column)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="data-table-pagination">
                    <div className="data-table-pagination-info">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length}
                    </div>
                    <div className="data-table-pagination-controls">
                        <button
                            className="data-table-pagination-btn"
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                            aria-label="First page"
                        >
                            <ChevronsLeft size={18} />
                        </button>
                        <button
                            className="data-table-pagination-btn"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <span className="data-table-pagination-current">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            className="data-table-pagination-btn"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <button
                            className="data-table-pagination-btn"
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                            aria-label="Last page"
                        >
                            <ChevronsRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DataTable
