"use client";

import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';

export default function CommunitiesPage() {
  const { currentUser, communities, toggleCommunityMembership } = useAppContext();
  
  if (!currentUser) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Communities</h1>
      {communities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communities.map(community => {
            const isMember = currentUser.communities.includes(community.id);
            return (
              <Card key={community.id} className="shadow-md flex flex-col">
                <div className="relative h-32 w-full">
                   <Image 
                        src={community.coverImage}
                        alt={`${community.name} cover`}
                        fill
                        className="object-cover rounded-t-md"
                        data-ai-hint="community cover"
                    />
                </div>
                <CardHeader>
                  <CardTitle>{community.name}</CardTitle>
                  <CardDescription className="flex-grow">{community.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant={isMember ? 'outline' : 'default'}
                    className="w-full"
                    onClick={() => toggleCommunityMembership(community.id)}
                  >
                    {isMember ? <LogOut size={16} className="mr-2" /> : <LogIn size={16} className="mr-2" />}
                    {isMember ? 'Leave Community' : 'Join Community'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <p>There are no communities available right now.</p>
        </div>
      )}
    </div>
  );
}
