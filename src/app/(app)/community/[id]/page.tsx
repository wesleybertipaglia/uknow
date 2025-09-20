
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';
import { LogIn, LogOut } from 'lucide-react';

export default function CommunityPage() {
  const { id } = useParams();
  const { communities, users, posts, currentUser, toggleCommunityMembership } = useAppContext();

  const community = communities.find(c => c.id === id);

  if (!community || !currentUser) {
    return <div className="text-center text-muted-foreground py-10">Community not found.</div>;
  }

  const isMember = currentUser.communities.includes(community.id);
  const communityMembers = users.filter(u => community.members.includes(u.id));
  const communityPosts = posts.filter(p => p.communityId === community.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-6">
      <Card className="shadow-md overflow-hidden">
        <div className="relative h-48 w-full">
            <Image
                src={community.coverImage}
                alt={`${community.name} cover`}
                fill
                className="object-cover"
                data-ai-hint="community cover image"
            />
        </div>
        <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{community.name}</h1>
                    <p className="text-muted-foreground mt-2">{community.description}</p>
                </div>
                <Button onClick={() => toggleCommunityMembership(community.id)} variant={isMember ? 'outline' : 'default'} className="shrink-0">
                    {isMember ? <LogOut size={16} className="mr-2" /> : <LogIn size={16} className="mr-2" />}
                    {isMember ? 'Leave Community' : 'Join Community'}
                </Button>
            </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4 mt-4">
          {isMember && <CreatePost communityId={community.id} />}
          {communityPosts.length > 0 ? (
            communityPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center text-muted-foreground py-10 border-2 border-dashed rounded-lg">
                <p>No posts in this community yet.</p>
                {isMember && <p className="text-sm">Be the first to share something!</p>}
            </div>
          )}
        </TabsContent>

        <TabsContent value="members" className="mt-4">
            {communityMembers.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {communityMembers.map(member => (
                        <Link href={`/profile/${member.id}`} key={member.id}>
                            <Card className="shadow-sm hover:shadow-md transition-shadow h-full">
                                <CardContent className="p-3 flex flex-col items-center text-center">
                                    <Avatar className="w-16 h-16 mb-2">
                                        <AvatarImage src={member.profilePhoto} alt={member.name} />
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="font-semibold text-sm">{member.name}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-10">This community has no members yet.</p>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
