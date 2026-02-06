import { useEffect,useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { calculateArticleHeight } from "../lib";
import { useInfinitePosts } from "../model";

export const usePostsVirtualizer = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: calculateArticleHeight,
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
