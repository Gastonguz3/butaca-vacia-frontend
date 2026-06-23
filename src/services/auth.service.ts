import { Register } from "@/types/auth/register";
import { apiFetch } from "./api";
import { Login } from "@/types/auth/login";
import { AuthResponse } from "@/types/auth/auth-response";

export const AuthService = {
  async register(data: Register): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(data: Login): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  //Debe existir: req.cookies?.refreshToken y request.user.id
  async refresh(): Promise<{ accessToken: string }> {
    return apiFetch<{ accessToken: string }>("/api/auth/refresh", {
      method: "POST",
    });
  },

  //Debe existir: request.user.id
  async logout(accessToken: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
