export const unwrapResponse = (response) => response?.data?.data ?? response?.data ?? response;

export const withMessage = (response) => ({
  data: unwrapResponse(response),
  message: response?.data?.message,
});

export const buildQueryString = (params = {}) => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return query ? `?${query}` : '';
};
