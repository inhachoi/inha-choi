import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinitePosts } from "../api/api";
import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getArticleHeight } from "../lib/utils";

const useInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: ({ pageParam }) => fetchInfinitePosts({ pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export const usePostsVirtualizer = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: getArticleHeight,
    overscan: 3,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const handleResize = () => rowVirtualizer.measure();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [rowVirtualizer]);

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    const isLastItem = lastItem?.index >= posts.length - 1;

    if (isLastItem && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    posts.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return {
    parentRef,
    rowVirtualizer,
    virtualItems,
    posts,
  };
};
