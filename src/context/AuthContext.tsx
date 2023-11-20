import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sigInRequest, sigUpRequest } from "../services/sigin.service";
import { api } from "../services/api";

interface User {
  id: number;
  name: string;
  login: string;
  avatarURL: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => void;
  signUp: (credentialsRegister: CredentialsRegister) => Promise<void>;
}

interface Credentials {
  email: string;
  password: string;
}
type CredentialsRegister = {
  name: string;
  login: string;
  password: string;
  avatarURL: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { FeedbackBooks_uuid: uuid } = parseCookies();
  const { FeedbackBooks_Token: Token } = parseCookies();
  async function getUser() {
    const { data } = await api.get("/user/" + uuid, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    setUser(data);
  }
  useEffect(() => {
    if (uuid) {
      getUser();
    }
  }, [uuid]);

  const signIn = async ({ email, password }: Credentials) => {
    try {
      const response = await sigInRequest({ email, password });
      setCookie(undefined, "FeedbackBooks_Token", response.token, {
        maxAge: 60 * 60 * 24 * 30,
      });
      setCookie(undefined, "FeedbackBooks_uuid", response.userId, {
        maxAge: 60 * 60 * 24 * 30,
      });
    } catch (error) {
      toast.error("Credenciais inválidas");
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const signUp = async ({
    login,
    password,
    avatarURL,
    name,
  }: CredentialsRegister) => {
    try {
      await sigUpRequest({ avatarURL, name, login, password });
      window.location.href = "/login";
    } catch (error) {
      toast.error("Error ao se cadastrar, tente novamente mais tarde");

      throw error;
    }
  };

  const signOut = () => {
    destroyCookie(null, "FeedbackBooks_Token");
    destroyCookie(null, "FeedbackBooks_uuid");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
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
