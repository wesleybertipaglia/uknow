"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { MOCK_USERS, MOCK_POSTS, MOCK_COMMUNITIES } from '@/lib/data';
import type { User, Post, Community, Comment } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

// Helper for password simulation
const simpleHash = (str: string) => `hashed_${str}`;

interface AppContextType {
  // Auth
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string, profilePhoto?: string) => boolean;

  // Data
  users: User[];
  posts: Post[];
  communities: Community[];
  
  // Data Updaters
  addPost: (content: string, imageUrl?: string, communityId?: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  toggleFriend: (friendId: string) => void;
  toggleCommunityMembership: (communityId: string) => void;
  updateUser: (updatedUser: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();

  // State
  const [users, setUsers] = useLocalStorage<User[]>('uknow-users', MOCK_USERS);
  const [posts, setPosts] = useLocalStorage<Post[]>('uknow-posts', MOCK_POSTS);
  const [communities, setCommunities] = useLocalStorage<Community[]>('uknow-communities', MOCK_COMMUNITIES);
  const [session, setSession] = useLocalStorage<{ userId: string } | null>('uknow-session', null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (session?.userId) {
      const user = users.find(u => u.id === session.userId) || null;
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
    setIsLoading(false);
  }, [session, users]);

  // Auth Methods
  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user && user.passwordHash === simpleHash(password)) {
      setSession({ userId: user.id });
      router.push('/feed');
      return true;
    }
    toast({ variant: "destructive", title: "Login Failed", description: "Invalid email or password." });
    return false;
  };

  const logout = () => {
    setSession(null);
    router.push('/login');
  };

  const signup = (name: string, email: string, password: string, profilePhoto?: string): boolean => {
    if (users.some(u => u.email === email)) {
      toast({ variant: "destructive", title: "Signup Failed", description: "An account with this email already exists." });
      return false;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      passwordHash: simpleHash(password),
      profilePhoto: profilePhoto || `https://picsum.photos/seed/${Date.now()}/200/200`,
      bio: '',
      friends: [],
      communities: [],
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setSession({ userId: newUser.id });
    router.push('/feed');
    return true;
  };
  
  // Data Methods
  const addPost = (content: string, imageUrl?: string, communityId?: string) => {
    if (!currentUser) return;
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      content,
      imageUrl,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
      communityId,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const toggleLike = (postId: string) => {
    if (!currentUser) return;
    setPosts(prevPosts => prevPosts.map(p => {
      if (p.id === postId) {
        const isLiked = p.likes.includes(currentUser.id);
        if (isLiked) {
          return { ...p, likes: p.likes.filter(id => id !== currentUser.id) };
        } else {
          return { ...p, likes: [...p.likes, currentUser.id] };
        }
      }
      return p;
    }));
  };

  const addComment = (postId: string, content: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorId: currentUser.id,
      content,
      createdAt: new Date().toISOString(),
    };
    setPosts(prevPosts => prevPosts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
  };
  
  const updateUser = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  };
  
  const toggleFriend = (friendId: string) => {
    if (!currentUser) return;
    const isFriend = currentUser.friends.includes(friendId);
    
    // Update current user's friend list
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === currentUser.id) {
        return isFriend
          ? { ...u, friends: u.friends.filter(id => id !== friendId) }
          : { ...u, friends: [...u.friends, friendId] };
      }
      return u;
    }));
    
    // Update the other user's friend list
    setUsers(prevUsers => prevUsers.map(u => {
        if (u.id === friendId) {
            return isFriend
                ? { ...u, friends: u.friends.filter(id => id !== currentUser.id) }
                : { ...u, friends: [...u.friends, currentUser.id] };
        }
        return u;
    }));
  };
  
  const toggleCommunityMembership = (communityId: string) => {
    if (!currentUser) return;
    
    // Update user's community list
    setUsers(prevUsers => prevUsers.map(u => {
        if (u.id === currentUser.id) {
            const isMember = u.communities.includes(communityId);
            return isMember
                ? { ...u, communities: u.communities.filter(id => id !== communityId) }
                : { ...u, communities: [...u.communities, communityId] };
        }
        return u;
    }));
    
    // Update community's member list
    setCommunities(prevCommunities => prevCommunities.map(c => {
        if (c.id === communityId) {
            const isMember = c.members.includes(currentUser.id);
            return isMember
                ? { ...c, members: c.members.filter(id => id !== currentUser.id) }
                : { ...c, members: [...c.members, currentUser.id] };
        }
        return c;
    }));
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    signup,
    users,
    posts,
    communities,
    addPost,
    toggleLike,
    addComment,
    toggleFriend,
    toggleCommunityMembership,
    updateUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
