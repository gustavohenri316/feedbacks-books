export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  id: number;
}

export interface AuthProviderType {
  children: React.ReactNode;
}
export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: ({ email, password }: SignInType) => Promise<void>;
  user: UserProfile | null;
}

export interface SignInType {
  email: string;
  password: string;
}