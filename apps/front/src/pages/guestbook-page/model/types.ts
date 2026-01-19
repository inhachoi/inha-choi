export interface UserDTO {
  id: string;
  login: string;
  avatarUrl?: string;
  profileUrl?: string;
}

export interface CommentDTO {
  id: string;
  content: string;
  createdAt: string;
  user: UserDTO;
}
