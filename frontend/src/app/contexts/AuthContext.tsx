"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import apiClient from "@/services/api-client";

interface AuthContextType {
  // State
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;

  // Actions
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Computed property
  const isAuthenticated = !!user && !!accessToken;

  // Setup axios interceptors
  useEffect(() => {
    // Request interceptor to add auth header
    const requestInterceptor = apiClient.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Response interceptor for token refresh
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await refreshAuth();
            // Get the new token and retry the request
            const newToken = accessToken; // This will be updated by refreshAuth
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient.request(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            await logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]); // Re-setup when token changes

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/admin/login", {
        email,
        password,
        role: "admin",
      });

      if (response.data.success) {
        const { accessToken: token, user: userData } = response.data.data;

        console.log("Login successful, access token:", token);

        // Set access token and user data
        setAccessToken(token);
        setUser(userData);

        // Redirect to admin dashboard
        router.push("/admin/dashboard");

        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Login failed"
        : "Login failed";
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // Call logout endpoint to clear refresh token
      await apiClient.post("/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local state regardless of API call success
      setUser(null);
      setAccessToken(null);
      setIsLoading(false);
      router.push("/admin-login");
    }
  };

  const refreshAuth = useCallback(async (): Promise<void> => {
    try {
      const response = await apiClient.post("/admin/refresh");

      if (response.data.success) {
        const { accessToken: newToken, user: userData } = response.data.data;
        setAccessToken(newToken);

        // Update user data if provided
        if (userData) {
          setUser(userData);
        } else {
          // Fetch user profile if not provided
          try {
            const userResponse = await apiClient.get("/admin/profile", {
              headers: { Authorization: `Bearer ${newToken}` },
            });
            if (userResponse.data.success) {
              setUser(userResponse.data.data);
            }
          } catch (profileError) {
            console.error("Failed to fetch user profile:", profileError);
          }
        }
      } else {
        throw new Error("Refresh token failed");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  }, []);

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        await refreshAuth();
        console.log("Authentication check successful");
      } catch (error) {
        console.log("Authentication check failed:", error);
        // Don't treat this as an error - user just isn't logged in
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    checkAuth();
  }, [refreshAuth]);

  const values = {
    user,
    accessToken,
    isLoading,
    isAuthenticated,
    isInitialized,
    login,
    logout,
    refreshAuth,
    setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
