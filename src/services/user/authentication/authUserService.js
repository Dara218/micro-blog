import { API_ENDPOINTS } from '@/constants';
import { api } from '@/services/common/http';

/**
 * Get CSRF cookie for Sanctum SPA mode
 */
export const getCsrfCookie = () => api.get('/api/sanctum/csrf-cookie');

/**
 * Sends credentials to authenticate the user.
 * The server should set a session cookie (withCredentials enabled on the client).
 *
 * @param {{ email: string, password: string }} credentials - User login payload
 * 
 * @returns {Promise<import('axios').AxiosResponse<any>>} Axios response promise
 */
export const login = (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

/**
 * Fetches the currently authenticated user based on the existing session cookie.
 * Useful on app startup to restore user state after a page refresh.
 *
 * @returns {Promise<import('axios').AxiosResponse<any>>} Axios response promise
 */
export const getAuthUser = () => api.get(API_ENDPOINTS.AUTH.GET_AUTH);

/**
 * Logs out the current user.
 * The server should clear the session cookie.
 *
 * @returns {Promise<import('axios').AxiosResponse<any>>} Axios response promise
 */
export const logout = () => api.post(API_ENDPOINTS.AUTH.LOGOUT);

/**
 * This function retrieves user statistics based on the provided user ID.
 * 
 * @param id - unique identifier of the user for whom you want to retrieve statistics.
 * 
 * @returns {Promise<import('axios').AxiosResponse<any>>} Axios response promise
 */
export const getUserStats = (id) => api.get(API_ENDPOINTS.AUTH.GET_USER_STATS(id));