import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import type { PostDTO } from "../model";

export const usePosts = () => {
  const { data, isLoading, isError } = useQuery<PostDTO[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return { posts: data ?? [], isLoading, isError };
};
