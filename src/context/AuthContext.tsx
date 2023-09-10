import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
      const response = await fakeApiSignIn(email, password);
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

  const fetchUserProfile = async () => {
    try {
      const { FeedbackBooks_Token: token } = parseCookies();
      if (token) {
        const userProfile = await fakeApiGetUserProfile(token);
        setUser(userProfile);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil do usuário:", error);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

async function fakeApiSignIn(email: string, password: string) {
  return new Promise<{ token: string; user: User }>((resolve, reject) => {
    setTimeout(() => {
      if (email === "gustavohenri316@icloud.com" && password === "Bara98ks@") {
        resolve({
          token: "fake-auth-token",
          user: {
            id: 1,
            name: "Gustavo Henrique Gonçalves de Oliveira",
            avatarUrl: "https://github.com/gustavohenri316.png",
            email: "gustavohenri316@icloud.com",
          },
        });
      } else {
        reject(new Error("Credenciais inválidas"));
      }
    }, 1000);
  });
}

async function fakeApiGetUserProfile(token: string) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (token === "fake-auth-token") {
        resolve({
          id: 1,
          name: "Gustavo Henrique Gonçalves de Oliveira",
          email: "gustavohenri316@icloud.com",
          avatarUrl: "https://github.com/gustavohenri316.png",
        });
      } else {
        reject(new Error("Token inválido"));
      }
    }, 1000);
  });
}
