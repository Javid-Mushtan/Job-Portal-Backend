import { apiClient } from './client.js';
import { unwrapResponse } from './helpers.js';

export const login = (credentials) =>
  apiClient.post('/auth/login', credentials).then(unwrapResponse);

export const register = (payload) =>
  apiClient.post('/auth/register', payload).then(unwrapResponse);
