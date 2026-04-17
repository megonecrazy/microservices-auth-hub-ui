import axios from 'axios';

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://myapp.local',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach Authoriation token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle generalized API errors
apiClient.interceptors.response.use(
  (response) => {
    // Optionally unwrap response body directly here
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status other than 200 range
      const status = error.response.status;
      if (status === 401) {
        // Unauthorized - perhaps token expired, trigger logout or redirect
        localStorage.removeItem('authToken');
        console.warn('Unauthorized access - redirecting or handling token expiration');
        // window.location.href = '/login'; // Alternatively, trigger a global event
      } else if (status === 403) {
        console.warn('Forbidden access');
      } else {
        console.error(`API Error: ${status}`, error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error - No response from server', error.request);
    } else {
      // Something happened in setting up the request
      console.error('API Setup Error', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
