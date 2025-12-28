import type { UserType } from "@/shared/lib/types";

export const fetchMe = async (): Promise<UserType | null> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  const data = await res.json();

  return data.user;
};
