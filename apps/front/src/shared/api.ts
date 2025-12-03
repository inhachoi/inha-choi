import type { PostType } from "./types";

export const fetchPosts = async (): Promise<PostType[]> => {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.posts;
};
