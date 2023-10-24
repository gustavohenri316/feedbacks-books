import { destroyCookie, setCookie } from "nookies";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { sigInRequest } from "../services/sigin.service";

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
}

interface Credentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const signIn = async ({ email, password }: Credentials) => {
    try {
      const response = await sigInRequest({ email, password });
      if (response && response.token) {
        toast.success(`Bem vindo! ${response.user.name}`);
        setUser(response.user);
        setCookie(undefined, "FeedbackBooks_Token", response.token, {
          maxAge: 60 * 60 * 24 * 30,
        });
        window.location.href = "/";
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      toast.error("Credenciais inválidas");
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const signOut = () => {
    destroyCookie(null, "FeedbackBooks_Token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
