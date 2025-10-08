import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Ensure that cookies, HTTP authentication credentials, and client-side SSL certificates are sent with cross-origin requests
});

// URL of storage
export const mediaUrl = (mediaPath) => {
  return `${import.meta.env.VITE_STORAGE_URL}/${mediaPath}`;
}