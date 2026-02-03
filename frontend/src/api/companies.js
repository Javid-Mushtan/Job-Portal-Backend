import { apiClient } from './client.js';
import { unwrapResponse } from './helpers.js';

const BASE = '/companies';

export const getAllCompanies = () => apiClient.get(`${BASE}/all`).then(unwrapResponse);

export const getCompanyById = (id) => apiClient.get(`${BASE}/${id}`).then(unwrapResponse);

export const getMyCompany = () => apiClient.get(`${BASE}/me`).then(unwrapResponse);

export const updateMyCompany = (payload) =>
  apiClient.put(`${BASE}/me`, payload).then(unwrapResponse);

export const uploadCompanyLogo = (companyId, logoUrl) =>
  apiClient.post(`${BASE}/${companyId}/logo`, null, { params: { logoUrl } });
