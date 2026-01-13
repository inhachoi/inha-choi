import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinitePosts } from "../api/api";

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: ({ pageParam }) => fetchInfinitePosts({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
