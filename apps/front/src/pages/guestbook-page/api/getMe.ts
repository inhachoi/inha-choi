import type { UserDTO } from "../model";

export const getMe = async (): Promise<UserDTO | null> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  const data = await res.json();

  return data.user;
};
