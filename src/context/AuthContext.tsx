import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authService } from "../services/auth.service";
import { AuthUser } from "../types";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: "CUSTOMER" | "MERCHANT";
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const refreshUser = async () => {
    setIsLoading(true);

    try {
      setUser(await authService.me());
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login: async (email, password) => {
        const authenticatedUser = await authService.login(email, password);
        setUser(authenticatedUser);
        navigate(authenticatedUser.role === "ADMIN" ? "/admin" : "/dashboard");
      },
      register: async (data) => {
        const authenticatedUser = await authService.register(data);
        setUser(authenticatedUser);
        navigate(authenticatedUser.role === "ADMIN" ? "/admin" : "/dashboard");
      },
      logout: async () => {
        await authService.logout();
        setUser(null);
        navigate("/");
      },
      refreshUser,
    }),
    [user, isLoading, navigate],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }
  return context;
}
