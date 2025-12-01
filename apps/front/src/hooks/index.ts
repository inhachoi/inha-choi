import { useState, useEffect } from "react";
import type { PostType } from "../types";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts ?? []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return posts;
};

export const usePopularPosts = () => {
  const posts = usePosts();
  const popularPosts = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 3);

  return popularPosts;
};
