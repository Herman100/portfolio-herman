"use client";

import { useAuth } from "../contexts/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {!isAuthenticated && (
          <div className="text-center text-gray-500">
            Please log in to access the admin panel.
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
