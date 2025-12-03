import type { PostType } from "./types";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./api";

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
