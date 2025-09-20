"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CreatePostProps {
    communityId?: string;
}

export default function CreatePost({ communityId }: CreatePostProps) {
  const { currentUser, addPost } = useAppContext();
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addPost(content, undefined, communityId);
      setContent('');
    }
  };
  
  if (!currentUser) return null;

  const placeholder = communityId 
    ? "Post something to the community..." 
    : `What's on your mind, ${currentUser.name}?`;

  return (
    <Card className="mb-6 shadow-md">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
             <Avatar>
                <AvatarImage src={currentUser.profilePhoto} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!content.trim()}>
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
