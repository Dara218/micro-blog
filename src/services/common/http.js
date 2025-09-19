import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// URL of storage
export const mediaUrl = (mediaPath) => {
  return `${import.meta.env.VITE_STORAGE_URL}/${mediaPath}`;
}