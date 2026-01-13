import { useInfiniteQuery } from "@tanstack/react-query";

// model/api.ts
export async function fetchInfinitePosts({
  pageParam = null,
}: {
  pageParam?: string | null;
}) {
  const url = pageParam ? `/api/posts?cursor=${pageParam}` : `/api/posts`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch posts");

  return res.json();
}

export const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: ({ pageParam }) => fetchInfinitePosts({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
