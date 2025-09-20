"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useAppContext } from '@/contexts/AppContext';
import type { Post } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { users, currentUser, toggleLike, addComment } = useAppContext();
  const [commentContent, setCommentContent] = useState('');
  const [showComments, setShowComments] = useState(false);

  const author = users.find(u => u.id === post.authorId);
  const isLiked = currentUser && post.likes.includes(currentUser.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      addComment(post.id, commentContent);
      setCommentContent('');
    }
  };
  
  if (!author) return null;

  return (
    <Card className="shadow-md">
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${author.id}`}>
            <Avatar>
              <AvatarImage src={author.profilePhoto} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/profile/${author.id}`} className="font-bold hover:underline">{author.name}</Link>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="mt-4 relative aspect-[3/2] w-full">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="rounded-md object-cover border"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex justify-between w-full items-center mb-2">
            <div className="flex gap-4">
                <Button variant="ghost" size="sm" onClick={() => toggleLike(post.id)} className="flex items-center gap-2">
                    <Heart size={16} className={cn(isLiked && 'fill-red-500 text-red-500')} />
                    <span>{post.likes.length} Like{post.likes.length !== 1 && 's'}</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)} className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    <span>{post.comments.length} Comment{post.comments.length !== 1 && 's'}</span>
                </Button>
            </div>
        </div>
        
        {showComments && (
          <div className="w-full mt-2 space-y-4">
            {post.comments.map(comment => {
              const commentAuthor = users.find(u => u.id === comment.authorId);
              if (!commentAuthor) return null;
              return (
                <div key={comment.id} className="flex items-start gap-3">
                    <Link href={`/profile/${commentAuthor.id}`}>
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={commentAuthor.profilePhoto} alt={commentAuthor.name} />
                            <AvatarFallback>{commentAuthor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <div className="bg-secondary p-2 rounded-md flex-1">
                        <div className="flex items-baseline gap-2">
                            <Link href={`/profile/${commentAuthor.id}`} className="font-bold text-sm hover:underline">{commentAuthor.name}</Link>
                            <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </p>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                    </div>
                </div>
              );
            })}
             {currentUser && (
                <form onSubmit={handleCommentSubmit} className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={currentUser.profilePhoto} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex flex-col gap-2">
                        <Textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            placeholder="Write a comment..."
                            className="text-sm"
                            rows={1}
                        />
                         <Button type="submit" size="sm" className="self-end" disabled={!commentContent.trim()}>Post Comment</Button>
                    </div>
                </form>
             )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
