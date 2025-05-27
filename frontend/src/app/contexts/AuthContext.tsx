"use client";

import React, { createContext, useContext } from "react";
import axios from "axios";

interface AuthContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const baseURL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const login = async (email: string, password: string) => {
    try {
      const response = await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        url: `${baseURL}/admin/login`,
        data: {
          email: email,
          password: password,
          role: "admin",
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    // Implement logout logic here
    console.log("Logging out");
  };

  const values = {
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
