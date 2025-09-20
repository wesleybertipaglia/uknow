"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Eye, PlusCircle } from 'lucide-react';
import CreateCommunityModal from '@/components/CreateCommunityModal';

export default function CommunitiesPage() {
  const { currentUser, communities, toggleCommunityMembership, addCommunity } = useAppContext();
  const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);
  
  if (!currentUser) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Communities</h1>
        <Button onClick={() => setCreateCommunityModalOpen(true)}>
            <PlusCircle size={16} className="mr-2" />
            Create Community
        </Button>
      </div>
       <CreateCommunityModal 
        isOpen={isCreateCommunityModalOpen}
        onClose={() => setCreateCommunityModalOpen(false)}
        onCreate={addCommunity}
      />
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
                <CardFooter className="flex items-center gap-2">
                    <Button asChild variant="secondary" className="flex-1">
                        <Link href={`/community/${community.id}`}>
                            <Eye size={16} className="mr-2" />
                            View
                        </Link>
                    </Button>
                    <Button
                        variant={isMember ? 'outline' : 'default'}
                        className="flex-1"
                        onClick={() => toggleCommunityMembership(community.id)}
                    >
                        {isMember ? <LogOut size={16} className="mr-2" /> : <LogIn size={16} className="mr-2" />}
                        {isMember ? 'Leave' : 'Join'}
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
