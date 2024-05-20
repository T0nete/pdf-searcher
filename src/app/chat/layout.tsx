'use client';

import ChatMainContent from '@/components/ChatMainContent';
import BlurBackground from '@/components/DarkBackground';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LayoutProvider from '@/providers/SidebarProvider';
import React from 'react';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh  px-4">
      <LayoutProvider>
        <Header />
        {children}
      </LayoutProvider>
    </div>
  );
}
