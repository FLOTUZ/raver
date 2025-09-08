"use client";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthAdminContextType {
  admin: User | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthAdminContextType | undefined>(undefined);

export const AuthAdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        const data = response.data as { user: User; token: string };

        setAdmin(response.data.user);
        localStorage.setItem("admin", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setLoading(false);
      }
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    setAdmin(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    setLoading(false);
  };

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = (): AuthAdminContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
