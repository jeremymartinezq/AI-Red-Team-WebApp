import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Temporary mock user for development
const MOCK_USER: User = {
  id: 'mock-user-id',
  email: 'dev@example.com',
  role: 'admin'
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize with mock user for development
  const [user] = useState<User | null>(MOCK_USER);

  // Temporary mock login function
  const login = useCallback(async (email: string, password: string) => {
    console.log('Login bypassed for development', { email });
    return Promise.resolve();
  }, []);

  // Temporary mock logout function
  const logout = useCallback(async () => {
    console.log('Logout bypassed for development');
    return Promise.resolve();
  }, []);

  // Always authenticated for development
  const value = {
    user,
    isAuthenticated: true, // Always true for development
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 