import { usePosts } from "@/shared/model";
import { sortPostsByLikes } from "@/shared/lib";

export const usePopularPosts = () => {
  const { posts } = usePosts();
  const popularPosts = sortPostsByLikes(posts).slice(0, 3);

  return popularPosts;
};
