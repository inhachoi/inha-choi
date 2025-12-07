import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/shared/api";
import type { PostType, UserType, CommentType } from "@/shared/types";
import { useEffect, useState, type FormEvent } from "react";
import { fetchComments, fetchMe, submitComment } from "./api";
import { sortPostsByLikes } from "./utils";

export const usePosts = () => {
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return { posts: data ?? [], isLoading, isError };
};

export const usePopularPosts = () => {
  const { posts } = usePosts();
  const popularPosts = sortPostsByLikes(posts).slice(0, 3);

  return popularPosts;
};

// 깃허브 소셜로그인
export const useGithubLogin = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 현재 로그인 유저 정보 가져오기
  useEffect(() => {
    Promise.all([fetchMe().then(setUser), fetchComments().then(setComments)]);
  }, []);

  // 깃허브 로그인 시작
  const handleLogin = () => {
    window.location.href = "/api/auth/github/login";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const newComment = await submitComment(content);
      setComments((prev) => [newComment, ...prev]);
      setContent("");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    user,
    content,
    setContent,
    comments,
    submitting,
    handleLogin,
    handleSubmit,
  };
};
