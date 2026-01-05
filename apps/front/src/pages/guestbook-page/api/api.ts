import type { CommentType, UserType } from "@/shared/model/types";

export const fetchComments = async (): Promise<CommentType[]> => {
  const res = await fetch("/api/guestbook", {
    credentials: "include",
  });
  const data = await res.json();

  return data.comments ?? [];
};

export const fetchMe = async (): Promise<UserType | null> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  const data = await res.json();

  return data.user;
};

export const submitComment = async (content: string): Promise<CommentType> => {
  const res = await fetch("/api/guestbook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
};
