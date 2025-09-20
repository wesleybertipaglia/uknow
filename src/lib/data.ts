import type { User, Post, Community } from './types';

// In a real app, you wouldn't store plain text passwords.
// This is a simple hash simulation.
const simpleHash = (str: string) => `hashed_${str}`;

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alice',
    email: 'alice@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/1/200/200',
    bio: 'Just a 2000s kid living in a modern world. I love photography and hiking.',
    friends: ['user-2', 'user-3'],
    communities: ['community-1', 'community-5'],
  },
  {
    id: 'user-2',
    name: 'Bob',
    email: 'bob@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/2/200/200',
    bio: 'Musician, foodie, and part-time philosopher. Looking for jam sessions.',
    friends: ['user-1'],
    communities: ['community-2', 'community-3'],
  },
  {
    id: 'user-3',
    name: 'Charlie',
    email: 'charlie@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/3/200/200',
    bio: 'Avid reader and marathon runner. Always up for a book recommendation.',
    friends: ['user-1'],
    communities: ['community-3', 'community-4'],
  },
    {
    id: 'user-4',
    name: 'Diana',
    email: 'diana@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/4/200/200',
    bio: 'Professional comedian. I find joy in making people laugh.',
    friends: [],
    communities: ['community-2'],
  },
  {
    id: 'user-5',
    name: 'Eve',
    email: 'eve@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/5/200/200',
    bio: 'Guitar enthusiast and aspiring songwriter.',
    friends: [],
    communities: ['community-2'],
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    authorId: 'user-1',
    content: 'Had an amazing time hiking this weekend! The views were breathtaking. 🌄',
    imageUrl: 'https://picsum.photos/seed/p1/600/400',
    likes: ['user-2', 'user-3'],
    comments: [
      { id: 'comment-1', authorId: 'user-2', content: 'Wow, that looks incredible!', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
      { id: 'comment-2', authorId: 'user-3', content: 'So jealous! We should go together next time.', createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'post-2',
    authorId: 'user-2',
    content: 'Tried a new recipe tonight and it was a success! Who wants the recipe?',
    likes: ['user-1'],
    comments: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'post-3',
    authorId: 'user-3',
    content: "Finished reading 'Dune' and my mind is blown. What an epic story! Can't wait for the movie.",
    imageUrl: 'https://picsum.photos/seed/p2/600/400',
    likes: [],
    comments: [
        { id: 'comment-3', authorId: 'user-1', content: 'It\'s one of my favorites!', createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString() }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'community-1',
    name: 'Mountain Trekkers',
    description: 'A group for people who love hiking, climbing, and all things mountains.',
    coverImage: 'https://picsum.photos/seed/c1/400/200',
    members: ['user-1'],
  },
  {
    id: 'community-2',
    name: 'Food Lovers',
    description: 'Share your favorite recipes, restaurant finds, and culinary adventures.',
    coverImage: 'https://picsum.photos/seed/c2/400/200',
    members: ['user-2', 'user-4', 'user-5'],
  },
  {
    id: 'community-3',
    name: 'Bookworm Corner',
    description: 'A cozy spot for readers to discuss their favorite books.',
    coverImage: 'https://picsum.photos/seed/c3/400/200',
    members: ['user-2', 'user-3'],
  },
  {
    id: 'community-4',
    name: 'Runners United',
    description: 'For everyone who loves to hit the pavement (or the trail).',
    coverImage: 'https://picsum.photos/seed/c4/400/200',
    members: ['user-3'],
  },
  {
    id: 'community-5',
    name: 'Analog Photography',
    description: 'Celebrating the art of film photography.',
    coverImage: 'https://picsum.photos/seed/c5/400/200',
    members: ['user-1'],
  },
];
