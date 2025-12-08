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
