import type { CommentDTO, UserDTO } from "../model/types.ts";

export const fetchComments = async (): Promise<CommentDTO[]> => {
  const res = await fetch("/api/guestbook", {
    credentials: "include",
  });
  const data = await res.json();

  return data.comments ?? [];
};

export const fetchMe = async (): Promise<UserDTO | null> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  const data = await res.json();

  return data.user;
};

export const submitComment = async (content: string): Promise<CommentDTO> => {
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
