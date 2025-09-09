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
export const login = (credentials) => api.post('/api/user/authenticate', credentials);

/**
 * Fetches the currently authenticated user based on the existing session cookie.
 * Useful on app startup to restore user state after a page refresh.
 *
 * @returns {Promise<import('axios').AxiosResponse<any>>} Axios response promise containing the authenticated user
 */
export const getAuthUser = () => api.get('/api/user/get-auth');

/**
 * Logs out the current user.
 * The server should clear the session cookie.
 *
 * @returns {Promise<import('axios').AxiosResponse<any>>} Axios response promise
 */
export const logout = () => api.post('/api/user/logout');