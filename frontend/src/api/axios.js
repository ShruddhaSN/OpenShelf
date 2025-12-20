import axios from "axios";
import { refreshAccessToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        localStorage.setItem("access", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
