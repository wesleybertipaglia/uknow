"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import { UserPlus, UserCheck } from 'lucide-react';

export default function ProfilePage() {
  const { id } = useParams();
  const { users, posts, communities, currentUser, toggleFriend } = useAppContext();

  const profileUser = users.find(u => u.id === id);

  if (!profileUser || !currentUser) return (
    <div className="text-center text-muted-foreground py-10">
        <p>User not found.</p>
    </div>
  );

  const userPosts = posts.filter(p => p.authorId === profileUser.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const userFriends = users.filter(u => profileUser.friends.includes(u.id));
  const userCommunities = communities.filter(c => profileUser.communities.includes(c.id));
  
  const isOwnProfile = currentUser.id === profileUser.id;
  const isFriend = currentUser.friends.includes(profileUser.id);

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="w-28 h-28 border-4 border-primary">
            <AvatarImage src={profileUser.profilePhoto} alt={profileUser.name} />
            <AvatarFallback>{profileUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold">{profileUser.name}</h1>
            <p className="text-muted-foreground mt-2">{profileUser.bio || "This user hasn't written a bio yet."}</p>
          </div>
          {!isOwnProfile && (
            <Button onClick={() => toggleFriend(profileUser.id)}>
              {isFriend ? <UserCheck size={16} className="mr-2" /> : <UserPlus size={16} className="mr-2" />}
              {isFriend ? 'Friends' : 'Add Friend'}
            </Button>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="space-y-4 mt-4">
          {userPosts.length > 0 ? (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-muted-foreground py-10">No posts yet.</p>
          )}
        </TabsContent>
        <TabsContent value="friends" className="mt-4">
            {userFriends.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userFriends.map(friend => (
                    <Link href={`/profile/${friend.id}`} key={friend.id}>
                        <Card className="shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-3 flex flex-col items-center text-center">
                                <Avatar className="w-16 h-16 mb-2">
                                    <AvatarImage src={friend.profilePhoto} alt={friend.name} />
                                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold text-sm">{friend.name}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                </div>
            ) : (
                 <p className="text-center text-muted-foreground py-10">No friends to show.</p>
            )}
        </TabsContent>
        <TabsContent value="communities" className="mt-4">
            {userCommunities.length > 0 ? (
                <div className="space-y-3">
                {userCommunities.map(community => (
                    <Card key={community.id} className="shadow-sm">
                        <CardContent className="p-3 flex items-center gap-4">
                            <Avatar className="rounded-md">
                                <AvatarImage src={community.coverImage} alt={community.name} />
                                <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{community.name}</p>
                                <p className="text-sm text-muted-foreground">{community.members.length} members</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                </div>
            ) : (
                 <p className="text-center text-muted-foreground py-10">Not a member of any communities.</p>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
