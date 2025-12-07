import type { CommentType, PostType, UserType } from "@/shared/types";

export const fetchPosts = async (): Promise<PostType[]> => {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.posts;
};

export const fetchMe = async (): Promise<UserType | null> => {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });
  const data = await res.json();

  return data.user;
};

export const fetchComments = async (): Promise<CommentType[]> => {
  const res = await fetch("/api/guestbook", {
    credentials: "include",
  });
  const data = await res.json();
  
  return data.comments ?? [];
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
