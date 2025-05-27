import React, { Children, createContext, useContext } from "react";

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
  const login = (email: string, password: string) => {
    // Implement login logic here
    console.log("Logging in with", email, password);
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
