import type { PostType } from "./types";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (): Promise<PostType[]> => {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.posts;
};

export const usePosts = () => {
  const { data } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return data ?? [];
};

export const usePopularPosts = () => {
  const posts = usePosts();
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return popularPosts;
};
