import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsInfinite } from "../api";

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["get-posts"],
    queryFn: ({ pageParam }) => getPostsInfinite({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
