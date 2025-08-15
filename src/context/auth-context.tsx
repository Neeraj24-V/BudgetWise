
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name?: string;
  currency?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  checkUserStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  checkUserStatus: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkUserStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      // This endpoint would be implemented to verify the session cookie
      // and return user data if valid. We will mock it for now.
      // In a real app, you would have a GET /api/auth/me endpoint.
      // For now, let's assume if there's a cookie, we need to verify it,
      // but we don't have that endpoint yet. So we just set loading to false.
      // This part will be completed when the 'me' endpoint is built.
      
      // We will need a `me` endpoint to make this work across page loads.
      // For now, logging in will set the user, but refreshing will lose it.
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, checkUserStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
