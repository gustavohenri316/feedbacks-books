import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sigInRequest } from "../services/sigin.service";
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
}

interface Credentials {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const {"FeedbackBooks_uuid": uuid} = parseCookies()
  async function getUser(){
    const {data} = await api.get('/user/'+uuid)
    setUser(data)
  }
  useEffect(() =>{
   if(uuid){

     getUser()
    }
    
  },[uuid])

  const signIn = async ({ email, password }: Credentials) => {
    try {
      const response = await sigInRequest({ email, password });
        setCookie(undefined, "FeedbackBooks_Token", response.token, {
          maxAge: 60 * 60 * 24 * 30,
        });
        setCookie(undefined, "FeedbackBooks_uuid", response.userId, {
          maxAge: 60 * 60 * 24 * 30,
        });
        window.location.href = "/";
     
    } catch (error) {
      toast.error("Credenciais inválidas");
      console.error("Erro ao fazer login:", error);
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
