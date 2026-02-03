import { apiClient } from './client.js';
import { unwrapResponse } from './helpers.js';

const BASE = '/users';

export const getCurrentUser = () => apiClient.get(`${BASE}/me`).then(unwrapResponse);

export const getUserById = (id) => apiClient.get(`${BASE}/${id}`).then(unwrapResponse);

export const updateProfile = (payload) => apiClient.put(`${BASE}/me`, payload).then(unwrapResponse);

export const uploadResume = (resumeUrl) =>
  apiClient.post(`${BASE}/me/resume`, null, { params: { resumeUrl } });

export const uploadProfilePicture = (profilePictureUrl) =>
  apiClient.post(`${BASE}/me/profile-picture`, null, { params: { profilePictureUrl } });
