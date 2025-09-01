"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AuthAdminContextType {
  admin: Admin | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthAdminContextType | undefined>(undefined);

export const AuthAdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAdmin({
      id: "1",
      name: "Emmanuel",
      email: "mail@example.com",
    });
    // opcional: guardar en localStorage/sessionStorage
  };

  const logout = () => {
    setAdmin(null);
    // opcional: limpiar localStorage/sessionStorage
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAdminAuth = (): AuthAdminContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
