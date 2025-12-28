export interface PostType {
  title: string;
  link: string;
  thumbnail: string;
  likes: number;
  description: string;
  released_at: string;
}

export interface UserType {
  id: string;
  login: string;
  avatarUrl?: string;
  profileUrl?: string;
}

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  user: UserType;
}

export interface CommentWriterType {
  user: UserType;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  submitting: boolean;
  handleLogin: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}
