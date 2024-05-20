'use client';

import ChatList from '@/components/ChatList';
import Header from '@/components/Header';
import Menu from '@/components/icons/Menu';
import React from 'react';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen px-4">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 relative overflow-hidden">
        {isSidebarOpen ? (
          <aside
            className={`fixed top-0 left-0 h-full bg-dark w-64 z-30 md:relative md:flex transform transition-transform ${
              isSidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full md:translate-x-0'
            }`}
          >
            <ChatList />
          </aside>
        ) : null}
        <main
          className={`flex-1 overflow-auto pt-4 md:px-0 ${
            isSidebarOpen ? '' : ''
          }`}
        >
          {children}
        </main>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden z-20 cursor-pointer"
            onClick={closeSidebar}
          ></div>
        )}
      </div>
    </div>
  );
}
