import { create } from 'zustand';
import { AuthState, User } from '../types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  login: async (email: string, password: string) => {
    try {
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
    } catch (error) {
      // Enhanced demo authentication with proper user data
      let mockUser: User;
      
      if (email === 'admin@demo.com') {
        mockUser = {
          id: 'admin-1',
          email: 'admin@demo.com',
          name: 'John Administrator',
          role: 'admin',
          createdAt: new Date().toISOString(),
        };
      } else if (email === 'farmer@demo.com') {
        mockUser = {
          id: 'farmer-1',
          email: 'farmer@demo.com',
          name: 'Mary Farmer',
          role: 'farmer',
          createdAt: new Date().toISOString(),
        };
      } else if (email === 'operator@demo.com') {
        mockUser = {
          id: 'operator-1',
          email: 'operator@demo.com',
          name: 'Bob Operator',
          role: 'drone_operator',
          createdAt: new Date().toISOString(),
        };
      } else if (email === 'security@demo.com') {
        mockUser = {
          id: 'security-1',
          email: 'security@demo.com',
          name: 'Alice Security',
          role: 'security_staff',
          createdAt: new Date().toISOString(),
        };
      } else {
        // Default user for any other email
        mockUser = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          role: 'farmer',
          createdAt: new Date().toISOString(),
        };
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      
      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
      });
    }
  },

  register: async (email: string, password: string, name: string, role: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });
      
      if (!response.ok) throw new Error('Registration failed');
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
    } catch (error) {
      // Mock registration
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: role as any,
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      
      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  updateUser: (userData: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null,
    }));
  },
}));