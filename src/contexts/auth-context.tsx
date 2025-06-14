
"use client";

import type { User } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect } from 'react';
// In a real app, you would import Firebase auth:
// import { auth } from '@/lib/firebase'; 
// import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email?: string, password?: string) => Promise<void>; // Mock login
  logout: () => Promise<void>; // Mock logout
  register: (email?: string, password?: string) => Promise<void>; // Mock register
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication logic
  useEffect(() => {
    // Simulate checking auth state
    const mockUser = localStorage.getItem('budgetwise-user');
    if (mockUser) {
      setUser(JSON.parse(mockUser) as User);
    }
    setLoading(false);
  }, []);

  const login = async (email?: string, password?: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUserData = { uid: 'mock-uid', email: email || 'user@example.com', displayName: 'Mock User' };
    localStorage.setItem('budgetwise-user', JSON.stringify(mockUserData));
    setUser(mockUserData as User);
    setLoading(false);
  };

  const register = async (email?: string, password?: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUserData = { uid: 'mock-uid-new', email: email || 'newuser@example.com', displayName: 'New User' };
    localStorage.setItem('budgetwise-user', JSON.stringify(mockUserData));
    setUser(mockUserData as User);
    setLoading(false);
  };


  const logout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('budgetwise-user');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
