import type { PostDTO } from "../model";

export const sortPostsByLikes = (posts: PostDTO[]): PostDTO[] => {
  return [...posts].sort((a, b) => b.likes - a.likes);
};
