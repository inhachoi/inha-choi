import type { PostType } from "@/shared/types";

export const formatYearMonth = (iso: string) => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}.${month}`;
};

export const sortPostsByLikes = (posts: PostType[]): PostType[] => {
  return [...posts].sort((a, b) => b.likes - a.likes);
};
