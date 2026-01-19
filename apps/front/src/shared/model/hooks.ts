import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/shared/api";
import type { PostDTO } from "@/shared/model/types";

export const usePosts = () => {
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return { posts: data ?? [], isLoading, isError };
};
