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
  isInitialized: boolean; // New flag to track if auth check is complete

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

  // Request interceptor to add auth header
  apiClient.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // Response interceptor for token refresh
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && accessToken) {
        try {
          await refreshAuth();
          // Retry the original request
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient.request(error.config);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          logout();
        }
      }
      return Promise.reject(error);
    }
  );

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
        const { accessToken: token } = response.data.data;

        // Set access token
        setAccessToken(token);

        // Fetch user profile with the new token
        const userResponse = await apiClient.get("/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.data.success) {
          setUser(userResponse.data.data);
        }
        // Redirect to admin dashboard
        router.push("/admin/dashboard");

        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
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
        const { accessToken: newToken } = response.data.data;
        setAccessToken(newToken);

        // Optionally refresh user data
        const userResponse = await apiClient.get("/admin/profile", {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        if (userResponse.data.success) {
          setUser(userResponse.data.data);
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  }, [apiClient]);

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        await refreshAuth();
      } catch (error) {
        console.error("Error during authentication check:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true); // Mark as initialized regardless of success/failure
      }
    };

    checkAuth();
  }, []);

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
