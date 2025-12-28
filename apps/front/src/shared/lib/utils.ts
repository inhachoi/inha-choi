import type { PostType } from "@/shared/lib/types";

export const formatYearMonth = (iso: string) => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}.${month}`;
};

export const formatYearMonthDay = (iso: string) => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export const sortPostsByLikes = (posts: PostType[]): PostType[] => {
  return [...posts].sort((a, b) => b.likes - a.likes);
};
