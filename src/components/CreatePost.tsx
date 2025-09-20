"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ImagePlus, X } from 'lucide-react';

interface CreatePostProps {
    communityId?: string;
}

export default function CreatePost({ communityId }: CreatePostProps) {
  const { currentUser, addPost } = useAppContext();
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // ~1MB limit
        alert("File size should not exceed 1MB.");
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert("Only JPG and PNG formats are supported.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetForm = () => {
    setContent('');
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || imageFile) {
      if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          addPost(content, reader.result as string, communityId);
          resetForm();
        };
        reader.readAsDataURL(imageFile);
      } else {
        addPost(content, undefined, communityId);
        resetForm();
      }
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

          {imagePreview && (
            <div className="relative w-48 h-32 rounded-md overflow-hidden">
                <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                        if(fileInputRef.current) fileInputRef.current.value = "";
                    }}
                >
                    <X size={16}/>
                </Button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <ImagePlus size={16} className="mr-2" />
                Add Image
            </Button>
            <Input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleImageChange}
                accept="image/jpeg, image/png"
            />
            <Button type="submit" disabled={!content.trim() && !imageFile}>
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
