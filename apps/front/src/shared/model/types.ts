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
