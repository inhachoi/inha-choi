import type { CommentDTO } from "../model";

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
