import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❌ No refresh token → logout
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // ❌ Already tried refresh → logout
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh }
        );

        localStorage.setItem("access", res.data.access);
        isRefreshing = false;

        originalRequest.headers.Authorization =
          `Bearer ${res.data.access}`;

        return api(originalRequest);
      } catch (err) {
        // ❌ refresh failed → force logout
        isRefreshing = false;
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
