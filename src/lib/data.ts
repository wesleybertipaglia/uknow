import type { User, Post, Community } from './types';

// Simulação simples de hash (não use em produção)
const simpleHash = (str: string) => `hashed_${str}`;

export const MOCK_USERS: User[] = [
  {
    id: '89634172',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/1/200/200',
    bio: '2000s kid navigating the modern world. Passionate about photography, hiking, and indie music festivals.',
    friends: ['99865775', '53294960', '18909893'],
    communities: ['34612705', '75938844'],
  },
  {
    id: '99865775',
    name: 'Bob Martinez',
    email: 'bob.martinez@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/2/200/200',
    bio: 'Guitarist, food lover, and part-time philosopher. Always up for a jam session or trying new street food.',
    friends: ['89634172', '64361314'],
    communities: ['60959001', '17390639'],
  },
  {
    id: '53294960',
    name: 'Charlie Kim',
    email: 'charlie.kim@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/3/200/200',
    bio: 'Bookworm and marathon runner. Coffee addict, always hunting for the next great read.',
    friends: ['89634172', '99865775'],
    communities: ['17390639', '24244559'],
  },
  {
    id: '18909893',
    name: 'Diana Lee',
    email: 'diana.lee@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/4/200/200',
    bio: 'Comedian by profession, optimist by nature. Life is better when you laugh.',
    friends: ['89634172'],
    communities: ['60959001'],
  },
  {
    id: '64361314',
    name: 'Eve Thompson',
    email: 'eve.thompson@example.com',
    passwordHash: simpleHash('password123'),
    profilePhoto: 'https://picsum.photos/seed/5/200/200',
    bio: 'Aspiring songwriter and guitar enthusiast. Always working on my next track.',
    friends: ['99865775'],
    communities: ['60959001'],
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: '76212242',
    authorId: '89634172',
    content: 'Had an amazing time hiking this weekend! The views were breathtaking. 🌄 Can’t wait to explore more trails.',
    imageUrl: 'https://picsum.photos/seed/p1/600/400',
    likes: ['99865775', '53294960', '18909893'],
    comments: [
      { id: '19223167', authorId: '99865775', content: 'Wow, that looks incredible! Mind sharing the location?', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
      { id: '59677541', authorId: '53294960', content: 'So jealous! We should plan a trip together soon.', createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
      { id: '83746592', authorId: '18909893', content: 'Love the energy here, looks like a blast!', createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString() },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '32367751',
    authorId: '99865775',
    content: 'Experimented with a spicy ramen recipe tonight. It was a huge success! 🍜 Anyone wants the recipe?',
    likes: ['89634172', '18909893'],
    comments: [
      { id: '98765432', authorId: '64361314', content: 'Please share! I’m always looking for new recipes.', createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '23043380',
    authorId: '53294960',
    content: "Just finished 'Dune' and wow, what a journey! The world-building is phenomenal. Anyone else excited for the movie?",
    imageUrl: 'https://picsum.photos/seed/p2/600/400',
    likes: ['89634172'],
    comments: [
      { id: '12977453', authorId: '89634172', content: "It's one of my all-time favorites! Can't wait to discuss it.", createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString() }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: '99011234',
    authorId: '18909893',
    content: 'Just tried stand-up for the first time at an open mic night. What a rush! 😅',
    likes: ['89634172', '99865775', '53294960'],
    comments: [
      { id: '55555555', authorId: '64361314', content: 'That’s amazing, Diana! Proud of you!', createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: '34612705',
    name: 'Mountain Trekkers',
    description: 'A passionate community for those who live for hiking, climbing, and exploring mountains. Share tips, trails, and epic stories.',
    coverImage: 'https://picsum.photos/seed/c1/400/200',
    members: ['89634172', '18909893'],
    ownerId: '89634172'
  },
  {
    id: '60959001',
    name: 'Food Lovers',
    description: 'From recipes to restaurant reviews, this is the place for all culinary adventurers to gather and share their foodie finds.',
    coverImage: 'https://picsum.photos/seed/c2/400/200',
    members: ['99865775', '18909893', '64361314', '89634172'],
    ownerId: '99865775'
  },
  {
    id: '17390639',
    name: 'Bookworm Corner',
    description: 'Cozy spot to discuss novels, recommend reads, and dive into literary debates.',
    coverImage: 'https://picsum.photos/seed/c3/400/200',
    members: ['99865775', '53294960', '89634172'],
    ownerId: '53294960'
  },
  {
    id: '24244559',
    name: 'Runners United',
    description: 'Join us if you love to run—whether it’s marathons, sprints, or casual jogs. Share your progress and training tips!',
    coverImage: 'https://picsum.photos/seed/c4/400/200',
    members: ['53294960'],
    ownerId: '53294960'
  },
  {
    id: '75938844',
    name: 'Analog Photography',
    description: 'A community celebrating the art and nostalgia of film photography. Share your shots, tips, and favorite cameras.',
    coverImage: 'https://picsum.photos/seed/c5/400/200',
    members: ['89634172', '18909893'],
    ownerId: '89634172'
  },
];
