import axios from "axios";
const BASE_URL = import.meta.env.MODE === "production" ? "" : import.meta.env.VITE_BACKEND_URL;
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
// let isRefreshing = false;
api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/refresh-token")) {
        originalRequest._retry = true;
        try {
            await api.post("/auth/refresh-token");
            return api(originalRequest);
        }
        catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});
export default api;
