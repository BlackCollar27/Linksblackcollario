import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to authenticated for development - set to true to access all pages
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>({
    email: 'dev@example.com',
    name: 'Developer'
  });

  const login = (email: string, password: string) => {
    // TODO: Replace with actual API call to your Rails backend
    console.log('Login:', email, password);
    setIsAuthenticated(true);
    setUser({ email, name: email.split('@')[0] });
  };

  const signup = (email: string, password: string) => {
    // TODO: Replace with actual API call to your Rails backend
    console.log('Signup:', email, password);
    setIsAuthenticated(true);
    setUser({ email, name: email.split('@')[0] });
  };

  const logout = () => {
    // TODO: Replace with actual API call to your Rails backend
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
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