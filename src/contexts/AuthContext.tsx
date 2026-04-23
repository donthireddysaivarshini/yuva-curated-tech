import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/api';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: (code: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(authService.getStoredUser());
  const [isLoading, setIsLoading] = useState(false);

  // On mount, if token exists, refresh profile from server
  useEffect(() => {
    if (authService.isLoggedIn()) {
      authService.getProfile()
        .then((profile) => {
          setUser(profile);
          localStorage.setItem('yuvaUser', JSON.stringify(profile));
        })
        .catch(() => {
          authService.logout();
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async (code: string) => {
    setIsLoading(true);
    try {
      const data = await authService.googleLogin(code);
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData: any) => {
    setIsLoading(true);
    try {
      await authService.signup(formData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    const profile = await authService.getProfile();
    setUser(profile);
    localStorage.setItem('yuvaUser', JSON.stringify(profile));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isLoading,
      login,
      googleLogin,
      signup,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};