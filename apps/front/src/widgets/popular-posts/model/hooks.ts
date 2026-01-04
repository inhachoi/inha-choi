import { usePosts } from "@/shared/model/hooks";
import { sortPostsByLikes } from "@/shared/lib/utils";

export const usePopularPosts = () => {
  const { posts } = usePosts();
  const popularPosts = sortPostsByLikes(posts).slice(0, 3);

  return popularPosts;
};
