import { useEffect, useState } from "react";
import { type FormEvent } from "react";

import { getComments, getMe, submitComment } from "../api";

import type { CommentDTO, UserDTO } from "./types.ts";

export const useGithubLogin = () => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMe().then(setUser),
      getComments().then(setComments),
    ]).finally(() => setIsLoading(false));
  }, []);

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
    isLoading,
    handleLogin,
    handleSubmit,
  };
};
