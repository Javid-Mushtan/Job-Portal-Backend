import { apiClient } from './client.js';
import { unwrapResponse, buildQueryString } from './helpers.js';

const JOBS_BASE = '/jobs';

export const getAllJobs = () => apiClient.get(`${JOBS_BASE}/all`).then(unwrapResponse);

export const getJobById = (id) => apiClient.get(`${JOBS_BASE}/${id}`).then(unwrapResponse);

export const searchJobs = (params) =>
  apiClient.get(`${JOBS_BASE}/search${buildQueryString(params)}`).then(unwrapResponse);

export const getCompanyJobs = (companyId) =>
  apiClient.get(`${JOBS_BASE}/company/${companyId}`).then(unwrapResponse);

export const createJob = (payload) => apiClient.post(JOBS_BASE, payload).then(unwrapResponse);

export const updateJob = (id, payload) => apiClient.put(`${JOBS_BASE}/${id}`, payload).then(unwrapResponse);

export const deleteJob = (id) => apiClient.delete(`${JOBS_BASE}/${id}`);
