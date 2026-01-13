import { usePosts } from "@/shared/model/hooks";
import { useState, useMemo } from "react";
import type { SortType } from "./types";

export const useSortPosts = () => {
  const { posts } = usePosts();
  const [sortType, setSortType] = useState<SortType>("latest");

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
