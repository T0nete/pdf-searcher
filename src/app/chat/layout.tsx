'use client';

import Header from '@/components/Header';
import SidebarProvider from '@/providers/SidebarProvider';
import React from 'react';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-dvh px-4">
        <Header />
        {children}
      </div>
    </SidebarProvider>
  );
}
