import type { PostType } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/shared/api";

export const usePosts = () => {
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return { posts: data ?? [], isLoading, isError };
};

export const usePopularPosts = () => {
  const { posts } = usePosts();
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return popularPosts;
};
