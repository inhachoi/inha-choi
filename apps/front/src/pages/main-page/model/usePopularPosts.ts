import { sortPostsByLikes } from "@/shared/lib";
import { usePosts } from "@/shared/model";

export const usePopularPosts = () => {
  const { posts, isLoading } = usePosts();
  const popularPosts = sortPostsByLikes(posts).slice(0, 3);

  return { popularPosts, isLoading };
};
