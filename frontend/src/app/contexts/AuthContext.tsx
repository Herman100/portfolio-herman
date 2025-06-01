"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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
        localStorage.setItem("accessToken", token);
        setAccessToken(token);

        // Fetch user profile with the new token
        const userResponse = await apiClient.get("/admin/profile");
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
      await apiClient.post("/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
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
        localStorage.setItem("accessToken", newToken);
        setAccessToken(newToken);

        // Optionally refresh user data
        const userResponse = await apiClient.get("/admin/profile");
        if (userResponse.data.success) {
          setUser(userResponse.data.data);
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      localStorage.removeItem("accessToken");
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      setAccessToken(null);
      router.push("/admin-login");
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [router]);

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("accessToken");
        if (token) {
          setAccessToken(token);
          await refreshAuth();
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    checkAuth();
  }, [refreshAuth]);

  // Auto-refresh token before it expires
  useEffect(() => {
    if (!accessToken || !isInitialized) return;

    const interval = setInterval(() => {
      refreshAuth().catch(() => {
        console.log("Auto-refresh failed");
      });
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [accessToken, refreshAuth, isInitialized]);

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
