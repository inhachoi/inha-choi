export interface PostDTO {
  title: string;
  link: string;
  thumbnail: string;
  likes: number;
  description: string;
  released_at: string;
}

export interface UserDTO {
  id: string;
  login: string;
  avatarUrl?: string;
  profileUrl?: string;
}

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
