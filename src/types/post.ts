export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: number;
  author: Author;
  timestamp: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
} 