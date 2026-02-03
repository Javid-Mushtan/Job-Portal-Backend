import { apiClient } from './client.js';
import { unwrapResponse } from './helpers.js';

const BASE = '/applications';

export const applyForJob = (payload) =>
  apiClient.post(`${BASE}/apply`, payload).then(unwrapResponse);

export const getMyApplications = () =>
  apiClient.get(`${BASE}/my-applications`).then(unwrapResponse);

export const getJobApplications = (jobId) =>
  apiClient.get(`${BASE}/job/${jobId}`).then(unwrapResponse);

export const updateApplicationStatus = (applicationId, status) =>
  apiClient
    .put(`${BASE}/${applicationId}/status`, null, { params: { status } })
    .then(unwrapResponse);

export const scheduleInterview = (applicationId, interviewDate) =>
  apiClient
    .post(`${BASE}/apply`, null, { params: { interviewDate } })
    .then(unwrapResponse);
