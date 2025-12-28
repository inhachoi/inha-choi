import { usePosts } from "@/shared/lib/hooks";
import { useState, useMemo } from "react";

export const useSortPosts = () => {
  const { posts } = usePosts();
  const [sortType, setSortType] = useState<"latest" | "oldest" | "likes">(
    "latest"
  );

  const sortedPosts = useMemo(() => {
    if (!posts) return [];

    switch (sortType) {
      case "latest":
        return posts;
      case "oldest":
        return [...posts].reverse();
      case "likes":
        return [...posts].sort((a, b) => b.likes - a.likes);
      default:
        return posts;
    }
  }, [posts, sortType]);

  return { sortType, setSortType, sortedPosts };
};
