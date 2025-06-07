import apiClient from "./api-client";

interface HealthCheckResponse {
  message: string;
  timestamp: string;
  uptime: number;
}

export const healthcheckService = {
  getSystemHealth: async (): Promise<HealthCheckResponse> => {
    const response = await apiClient.get("/healthcheck");
    return response.data.data;
  },

  getAdminHealth: async (): Promise<HealthCheckResponse> => {
    const response = await apiClient.get("/healthcheck/admin");
    return response.data.data;
  },
};
