import { SidebarContext } from '@/providers/SidebarProvider';
import React from 'react';
import ChatList from './ChatList';
import { Chat } from '@/types/supabase-databse';

type Props = {
  currentChatId: string;
  chatList: Chat[];
};

const Sidebar = (props: Props) => {
  const { isSidebarOpen } = React.useContext(SidebarContext);

  if (!isSidebarOpen) return null;

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-dark w-64 z-30 md:relative md:flex transform transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <ChatList currentChatId={props.currentChatId} chatList={props.chatList} />
    </aside>
  );
};

export default Sidebar;
