'use client';

import React from 'react';
import { SidebarContext } from '@/providers/SidebarProvider';
import ChatList from '@/components/ChatList';
import Menu from './icons/Menu';

type Props = {
  currentChatId: string;
  chatList: any;
};

const Sidebar = (props: Props) => {
  const { isSidebarOpen, toggleSidebar } = React.useContext(SidebarContext);

  if (!isSidebarOpen) return null;

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-dark w-64 z-30 md:relative md:flex transform transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="h-16 flex flex-row items-center px-4 md:hidden">
        <button
          className="bg-brand-orange p-1 rounded-md hover:bg-brand-orange-hover duration-200 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
      </div>
      <ChatList currentChatId={props.currentChatId} chatList={props.chatList} />
    </aside>
  );
};

export default Sidebar;
