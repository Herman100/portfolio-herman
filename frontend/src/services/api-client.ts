import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Request interceptor to add auth header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && localStorage.getItem("accessToken")) {
      try {
        // Call refresh endpoint
        const response = await apiClient.post("/admin/refresh");
        if (response.data.success) {
          const { accessToken: newToken } = response.data.data;
          localStorage.setItem("accessToken", newToken);

          // Retry the original request
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return apiClient.request(error.config);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
