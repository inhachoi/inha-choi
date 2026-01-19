import type { UserDTO } from "@/shared/model/types";

export interface CommentWriterDTO {
  user: UserDTO;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  handleLogin: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export interface CommentDTO {
  id: string;
  content: string;
  createdAt: string;
  user: UserDTO;
}
