import type { CommentDTO } from "../model";

export const getComments = async (): Promise<CommentDTO[]> => {
  const res = await fetch("/api/guestbook", {
    credentials: "include",
  });
  const data = await res.json();

  return data.comments ?? [];
};
