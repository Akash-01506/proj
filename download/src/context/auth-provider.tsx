"use client";

import React, { createContext, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { User, UserRole } from '@/lib/types';
import { users as mockUsers } from '@/lib/placeholder-data';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = useCallback((role: UserRole) => {
    // Find a mock user with the selected role
    const mockUser = mockUsers.find(u => u.role === role);
    if (mockUser) {
      setUser(mockUser);
      router.push('/dashboard');
    } else {
      // Fallback if no user for that role is found
      console.error(`No mock user found for role: ${role}`);
      const fallbackUser = { id: 'fallback-user', name: 'Guest', email: 'guest@example.com', role, avatar: 'https://picsum.photos/seed/99/100/100' };
      setUser(fallbackUser);
      router.push('/dashboard');
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    router.push('/login');
  }, [router]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
