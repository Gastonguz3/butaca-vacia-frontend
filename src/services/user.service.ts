import { PaginatedResponse } from "@/types/paginated-response";
import { UserResponse } from "@/types/user-response";
import { apiFetch } from "./api";
import { UpdateUser } from "@/types/update-user";
import { ChangePassword } from "@/types/change-password";

export const UserService = {
  async getProfile(accessToken: string): Promise<UserResponse> {
    return apiFetch<UserResponse>("/api/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async getById(accessToken: string, userId: string): Promise<UserResponse> {
    return apiFetch<UserResponse>(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async getAll(
    accessToken: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<UserResponse>> {
    return apiFetch<PaginatedResponse<UserResponse>>(
      `/api/users?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  async updateProfile(
    accessToken: string,
    data: UpdateUser,
  ): Promise<UserResponse> {
    return apiFetch<UserResponse>("/api/users/me", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  },

  async changePassword(
    accessToken: string,
    data: ChangePassword,
  ): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/api/users/me/password", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  },

  async deleteAccount(accessToken: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>("/api/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async deleteUser(
    accessToken: string,
    userId: string,
  ): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
