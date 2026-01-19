import { useState, useEffect } from "react";
import type { UserDTO, CommentDTO } from "@/shared/model/types";
import { fetchMe, fetchComments, submitComment } from "../api/api.ts";
import { type FormEvent } from "react";

export const useGithubLogin = () => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [comments, setComments] = useState<CommentDTO[]>([]);
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
