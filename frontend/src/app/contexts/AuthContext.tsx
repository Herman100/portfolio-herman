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

interface AuthContextType {
  // State
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

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
  const router = useRouter();

  const baseURL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  // Computed property
  const isAuthenticated = !!user && !!accessToken;

  // Configure axios instance with interceptors
  const apiClient = axios.create({
    baseURL,
    withCredentials: true, // Important for cookies
  });

  // Request interceptor to add auth header
  apiClient.interceptors.request.use((config) => {
    // console.log("Request config:", config);

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
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
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
    }
  };

  const refreshAuth = async (): Promise<void> => {
    try {
      const response = await apiClient.post("/admin/refresh");

      if (response.data.success) {
        const { accessToken: newToken } = response.data.data;
        setAccessToken(newToken);

        // Optionally refresh user data
        const userResponse = await apiClient.get("/admin/profile");
        if (userResponse.data.success) {
          setUser(userResponse.data.data);
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  };

  // Check authentication status on initial load
  useCallback(() => {
    const checkAuth = async () => {
      try {
        await refreshAuth();
      } catch (error) {
        console.error("Error during authentication check:", error);
      }
    };

    checkAuth();
  }, []);

  // Auto-refresh token before it expires
  useEffect(() => {
    if (!accessToken) return;

    // Refresh token every 14 minutes (assuming 15-minute expiry)
    const interval = setInterval(() => {
      refreshAuth().catch(() => {
        console.log("Auto-refresh failed");
      });
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken]);

  const values = {
    user,
    accessToken,
    isLoading,
    isAuthenticated,
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
