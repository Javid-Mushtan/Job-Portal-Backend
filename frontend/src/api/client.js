import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

export const apiClient = axios.create({
  baseURL,
  timeout: 12000,
});

export const setClientToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || data?.error || error.message;
      return Promise.reject(new Error(message || `Request failed with status ${status}`));
    }
    return Promise.reject(error);
  }
);
