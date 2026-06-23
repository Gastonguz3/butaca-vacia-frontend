export type AuthResponse = {
  accessToken: string;

  user: {
    id: string;
    email: string;
    username: string;
    role: "USER" | "ADMIN";
  };
};
