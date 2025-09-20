"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppContext } from '@/contexts/AppContext';
import type { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { ImagePlus, X } from 'lucide-react';

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const formSchema = z.object({
  content: z.string(),
  imageFile: z.any().optional(),
});

export default function EditPostModal({ isOpen, onClose, post }: EditPostModalProps) {
  const { updatePost } = useAppContext();
  const [imagePreview, setImagePreview] = useState<string | null>(post.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post.content,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({ content: post.content });
      setImagePreview(post.imageUrl || null);
    }
  }, [isOpen, post, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
       if (file.size > 5 * 1024 * 1024) { // ~5MB limit
        alert("File size should not exceed 5MB.");
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert("Only JPG and PNG formats are supported.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const imageFile = values.imageFile?.[0];
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
            updatePost(post.id, values.content, reader.result as string);
            onClose();
        };
        reader.readAsDataURL(imageFile);
    } else {
        // If imagePreview is null, it means the user removed the image
        const newImageUrl = imagePreview === null ? '' : post.imageUrl;
        updatePost(post.id, values.content, newImageUrl);
        onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <Label>Image</Label>
               {imagePreview && (
                <div className="relative w-48 h-32 rounded-md overflow-hidden my-2">
                    <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                    <Button 
                        type="button"
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => {
                            setImagePreview(null);
                             form.setValue('imageFile', null);
                             if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                    >
                        <X size={16}/>
                    </Button>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <ImagePlus size={16} className="mr-2" />
                    {imagePreview ? 'Change Image' : 'Add Image'}
                </Button>
                <FormControl>
                    <Input 
                        type="file" 
                        accept="image/jpeg, image/png" 
                        className="hidden"
                        {...form.register('imageFile')}
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>

            <DialogFooter>
               <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
