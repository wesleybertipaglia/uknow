"use client";

import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserMinus } from 'lucide-react';

export default function FriendsPage() {
  const { currentUser, users, toggleFriend } = useAppContext();

  if (!currentUser) return null;

  const friends = users.filter(user => currentUser.friends.includes(user.id));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Friends</h1>
      {friends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {friends.map(friend => (
            <Card key={friend.id} className="shadow-md">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Link href={`/profile/${friend.id}`}>
                  <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                    <AvatarImage src={friend.profilePhoto} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <Link href={`/profile/${friend.id}`} className="font-bold hover:underline">{friend.name}</Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => toggleFriend(friend.id)}
                >
                  <UserMinus size={16} className="mr-2" />
                  Unfriend
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10 border-dashed border-2 rounded-md">
          <p>You haven't added any friends yet.</p>
          <p className="text-sm">Explore and connect with others!</p>
        </div>
      )}
    </div>
  );
}
