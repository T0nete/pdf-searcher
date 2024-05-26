'use client';

import React from 'react';
import Header from '@/components/Header';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh px-4">
      <Header />
      {children}
    </div>
  );
}
