export type UserResponse = {
  id: string;

  email: string;

  username: string;

  role: "ADMIN" | "USER";

  createdAt: Date;

  updatedAt: Date;
};
