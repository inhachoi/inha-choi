import type { CommentType } from "@/shared/lib/types";

export const fetchComments = async (): Promise<CommentType[]> => {
  const res = await fetch("/api/guestbook", {
    credentials: "include",
  });
  const data = await res.json();

  return data.comments ?? [];
};
