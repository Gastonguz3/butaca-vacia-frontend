"use client";

import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { AuthResponse } from "@/types/auth/auth-response";
import { Login } from "@/types/auth/login";
import { Register } from "@/types/auth/register";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: AuthResponse["user"] | null;
  accessToken: string | null;

  loading: boolean;
  isAuthenticated: boolean;

  login: (data: Login) => Promise<void>;
  register: (data: Register) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  async function login(data: Login) {
    const response = await AuthService.login(data);

    setAccessToken(response.accessToken);
    setUser(response.user);
  }

  async function register(data: Register) {
    const response = await AuthService.register(data);

    setAccessToken(response.accessToken);
    setUser(response.user);
  }

  async function logout() {
    if (accessToken) {
      await AuthService.logout(accessToken);
    }

    setAccessToken(null);
    setUser(null);
  }

  useEffect(() => {
    async function refresh() {
      try {
        const { accessToken } = await AuthService.refresh();

        setAccessToken(accessToken);

        const user = await UserService.getProfile(accessToken);

        setUser(user);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,

        loading,
        isAuthenticated: !!user,

        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
