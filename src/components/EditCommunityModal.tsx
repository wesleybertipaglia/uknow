"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Community } from '@/lib/types';
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

interface EditCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: Community;
  onSave: (data: { name: string; description: string; coverImage: string }) => void;
}

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }).max(50, { message: 'Name cannot exceed 50 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).max(200, { message: 'Description cannot exceed 200 characters.' }),
  coverImageFile: z.any().optional(),
});

export default function EditCommunityModal({ isOpen, onClose, community, onSave }: EditCommunityModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: community.name,
      description: community.description,
    },
  });
  
  useEffect(() => {
    if (community) {
      form.reset({
        name: community.name,
        description: community.description,
      });
    }
  }, [community, form, isOpen]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const file = values.coverImageFile?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSave({
          name: values.name,
          description: values.description,
          coverImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      onSave({
        name: values.name,
        description: values.description,
        coverImage: community.coverImage, // Keep original image if none is uploaded
      });
    }
    onClose();
  };
  
  const handleClose = () => {
    form.reset({ name: community.name, description: community.description });
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Community</DialogTitle>
          <DialogDescription>
            Make changes to your community. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Community Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vintage Gamers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is your community about?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="coverImageFile"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" {...form.register('coverImageFile')} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
               <DialogClose asChild>
                <Button type="button" variant="secondary" onClick={handleClose}>
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
