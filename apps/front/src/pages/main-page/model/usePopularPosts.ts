import { usePosts } from "@/shared/model/usePosts";
import { sortPostsByLikes } from "@/shared/lib/sortPostsByLikes";

export const usePopularPosts = () => {
  const { posts } = usePosts();
  const popularPosts = sortPostsByLikes(posts).slice(0, 3);

  return popularPosts;
};
