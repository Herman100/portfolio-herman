import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
