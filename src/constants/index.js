// src/constants/index.js
export const DEFAULT_USER_AVATAR = '/default-user-avatar.png';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/user/authenticate',
    LOGOUT: '/api/user/logout',
    GET_AUTH: '/api/user/get-auth', 
    GET_USER_STATS: id => `/api/user/${id}/get-stats`,
  },
  POST: {
    GET_POST: id => `/api/post/${id}`,
    GET_FRIENDS_POST: id => `/api/post/${id}/friends`,
    GET_HOME_POST: id => `/api/post/${id}/home`,
  },
};

// // Add other global constants here
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// export const APP_NAME = 'MicroBlog';