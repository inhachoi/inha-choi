import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api";

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["get-posts"],
    queryFn: ({ pageParam }) => getPosts({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
