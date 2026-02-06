import type { PostDTO } from "../model";

export const getPosts = async (): Promise<PostDTO[]> => {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.posts;
};
