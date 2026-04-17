import apiClient from '../api/apiClient';

/**
 * Service to handle authentication related API calls mapping to the springpractice auth-service.
 */
export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { username, email, password }
   */
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  /**
   * Login user to receive token
   * @param {Object} credentials - { username, password }
   */
  login: (credentials) => {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * Verify an OTP or token if applicable
   * @param {string} token 
   */
  verifyToken: (token) => {
    return apiClient.get(`/auth/verify?token=${token}`);
  },

  /**
   * Optional: Fetch current authenticated user's profile
   */
  getProfile: () => {
    return apiClient.get('/users/me');
  }
};
