"use client";

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';

export default function FeedPage() {
  const { posts } = useAppContext();
  
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <CreatePost />
      {sortedPosts.length > 0 ? (
        sortedPosts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <p>The feed is empty. Be the first to post!</p>
        </div>
      )}
    </div>
  );
}
