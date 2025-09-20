export interface Comment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  likes: string[]; // Array of user IDs
  comments: Comment[];
  createdAt: string;
  communityId?: string; // ID of the community this post belongs to
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app, this would be a hash
  profilePhoto: string;
  bio: string;
  friends: string[]; // Array of user IDs
  communities: string[]; // Array of community IDs
}

export interface Community {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  members: string[]; // Array of user IDs
}
