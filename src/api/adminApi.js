import apiClient from './client'

/**
 * Admin API Services
 * All API calls for admin functionality
 */

// ============ PROJECTS ============
export const projectsApi = {
    getAll: () => apiClient.get('/admin/projects'),
    getById: (id) => apiClient.get(`/admin/projects/${id}`),
    create: (data) => apiClient.post('/admin/projects', data),
    update: (id, data) => apiClient.put(`/admin/projects/${id}`, data),
    deactivate: (id) => apiClient.put(`/admin/projects/${id}/deactivate`)
}

// ============ LEADS ============
export const leadsApi = {
    getAll: () => apiClient.get('/admin/leads'),
    getById: (id) => apiClient.get(`/admin/leads/${id}`),
    assign: (id, advisorId) => apiClient.put(`/admin/leads/${id}/assign`, { advisorId }),
    updateStatus: (id, status) => apiClient.put(`/admin/leads/${id}/status`, { status })
}

// ============ SITE VISITS ============
export const siteVisitsApi = {
    getAll: () => apiClient.get('/admin/site-visits'),
    getById: (id) => apiClient.get(`/admin/site-visits/${id}`),
    assignAdvisor: (id, advisorId) => apiClient.put(`/admin/site-visits/${id}/assign`, { advisorId })
}

// ============ ADVISORS ============
export const advisorsApi = {
    getAll: () => apiClient.get('/admin/advisors'),
    getById: (id) => apiClient.get(`/admin/advisors/${id}`),
    create: (data) => apiClient.post('/admin/advisors', data),
    update: (id, data) => apiClient.put(`/admin/advisors/${id}`, data),
    deactivate: (id) => apiClient.put(`/admin/advisors/${id}/deactivate`),
    getPerformance: (id) => apiClient.get(`/admin/advisors/${id}/performance`)
}

// ============ DASHBOARD ============
export const dashboardApi = {
    getStats: () => apiClient.get('/admin/dashboard/stats'),
    getRecentActivity: () => apiClient.get('/admin/dashboard/activity')
}
