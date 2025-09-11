import * as auth from '@/services/user/authentication/authUserService';
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    /**
     * Get the authenticated user.
     *
     * @returns {Promise<void>}
     */
    async getAuthenticatedUser() {
      try {
        const response = await auth.getAuthUser();

        this.user = response.data.user;
      } catch (error) {
        this.user = null;
      }
    },
    /**
     * Login the user in the server.
     *
     * @param {{ email: string, password: string }} credentials
     * 
     * @returns {Promise<any>} The response data (adjust as needed)
     */
    async login(credentials) {
      try {
        // Clear previous error
        this.error = null;

        // Get CSRF cookie
        await auth.getCsrfCookie();

        // Call the login endpoint
        const response = await auth.login(credentials);

        if (response.data.success) {
          this.user = response.data.data;
        } else {
          this.error = response.data.message || 'Login failed';
        }

        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Invalid login details';

        throw error;
      }
    },
  }
});