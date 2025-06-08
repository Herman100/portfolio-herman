import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
// process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
