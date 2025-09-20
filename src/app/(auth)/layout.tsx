import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold font-headline text-primary-foreground/80 mb-2">
            uKnow
        </h1>
        <p className="text-muted-foreground mb-8">A flashback to simpler times.</p>
      {children}
    </main>
  );
}
