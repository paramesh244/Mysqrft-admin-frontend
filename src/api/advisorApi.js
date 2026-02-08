import apiClient from './client'

/**
 * Advisor API Services
 * All API calls for advisor functionality
 */

// ============ LEADS ============
export const leadsApi = {
    getAssigned: () => apiClient.get('/advisor/leads'),
    getById: (id) => apiClient.get(`/advisor/leads/${id}`),
    addRemark: (id, remark) => apiClient.post(`/advisor/leads/${id}/remarks`, { remark }),
    getRemarks: (id) => apiClient.get(`/advisor/leads/${id}/remarks`)
}

// ============ SITE VISITS ============
export const siteVisitsApi = {
    getAssigned: () => apiClient.get('/advisor/site-visits'),
    getById: (id) => apiClient.get(`/advisor/site-visits/${id}`),
    confirm: (id) => apiClient.put(`/advisor/site-visits/${id}/confirm`),
    complete: (id, remarks) => apiClient.put(`/advisor/site-visits/${id}/complete`, { remarks })
}

// ============ PROFILE ============
export const profileApi = {
    get: () => apiClient.get('/advisor/profile'),
    update: (data) => apiClient.put('/advisor/profile', data),
    getPerformance: () => apiClient.get('/advisor/profile/performance')
}

// ============ DASHBOARD ============
export const dashboardApi = {
    getStats: () => apiClient.get('/advisor/dashboard/stats'),
    getTodayTasks: () => apiClient.get('/advisor/dashboard/tasks')
}
