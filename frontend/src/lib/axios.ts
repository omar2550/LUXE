import axios, { type InternalAxiosRequestConfig } from "axios";

const BASE_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<void> | null = null;

function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${BASE_URL}/auth/refresh-token`, {}, { withCredentials: true })
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

function isRefreshRequest(config: RetryableConfig) {
  const u = config.url ?? "";
  return u.includes("refresh-token");
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableConfig | undefined;
    const status = error.response?.status;

    if (status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (isRefreshRequest(originalRequest)) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshSession();
      return api(originalRequest);
    } catch {
      console.error("Session expired, redirecting...");
      return Promise.reject(error);
    }
  },
);

export default api;
