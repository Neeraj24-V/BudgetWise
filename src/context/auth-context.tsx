
"use client";

import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

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
      const res = await fetch('/api/auth/me');

      if (!res.ok) {
        throw new Error('Not authenticated');
      }

      const data = await res.json();
      setUser(data.user);

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
  
  // This is a special handler for when the user logs in via OTP.
  // The login page dispatches this event.
  useEffect(() => {
    const handleLoggedIn = () => {
      checkUserStatus();
    };
    window.addEventListener('loggedIn', handleLoggedIn);
    return () => {
      window.removeEventListener('loggedIn', handleLoggedIn);
    }
  }, [checkUserStatus]);


  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, checkUserStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
