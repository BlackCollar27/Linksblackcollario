import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'starter' | 'growth' | 'enterprise';
  role: 'owner' | 'admin' | 'member';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  sendMagicLink: (email: string) => Promise<{ success: boolean; message?: string }>;
  verifyMagicLink: (token: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  loginWithGoogle: () => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // TODO: Replace with actual API call to check session
      // GET /api/auth/session
      const response = await fetch('/api/auth/session', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const sendMagicLink = async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      // TODO: Replace with actual API call to your Rails backend
      // POST /api/auth/magic-link
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: 'Magic link sent! Check your email.' };
      } else {
        return { success: false, message: data.error || 'Failed to send magic link.' };
      }
    } catch (error) {
      console.error('Send magic link failed:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const verifyMagicLink = async (token: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      // TODO: Replace with actual API call to your Rails backend
      // POST /api/auth/verify
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Invalid or expired token.' };
      }
    } catch (error) {
      console.error('Verify magic link failed:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const loginWithGoogle = () => {
    // TODO: Redirect to Rails Google OAuth endpoint
    // window.location.href = '/api/auth/google';
    console.log('Google OAuth - redirect to Rails backend');
  };

  const logout = async () => {
    try {
      // TODO: Replace with actual API call to your Rails backend
      // DELETE /api/auth/logout
      await fetch('/api/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      sendMagicLink, 
      verifyMagicLink,
      loginWithGoogle,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}