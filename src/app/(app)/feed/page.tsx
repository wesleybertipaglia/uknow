"use client";

import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';

export default function FeedPage() {
  const { posts, currentUser } = useAppContext();
  
  // Filter for posts that are NOT in a community (or are from communities the user is in - for now, main feed is for non-community posts)
  const feedPosts = posts.filter(p => !p.communityId);
  const sortedPosts = [...feedPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
