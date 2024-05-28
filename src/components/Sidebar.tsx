'use client';

import React from 'react';
import { User } from '@supabase/supabase-js';
import { SidebarContext } from '@/providers/SidebarProvider';
import ChatList from '@/components/ChatList';
import Menu from '@/components/icons/BurgerMenu';
import Logoutbutton from '@/components/GoogleButtons/LogoutButton';
import LoginButton from '@/components/GoogleButtons/LoginButton';
import { supabaseClient } from '@/lib/supabase/browserClient';

type Props = {
  currentChatId: string;
  chatList: any;
};

const Sidebar = (props: Props) => {
  const { isSidebarOpen, toggleSidebar } = React.useContext(SidebarContext);

  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const fetchUserData = async () => {
      const user = await supabaseClient.auth.getUser();
      setUser(user.data?.user);
    };

    fetchUserData();
  }, [setUser]);

  return (
    <aside
      className={`fixed top-0 left-0 z-30 w-64 h-full bg-dark transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0 md:translate-x-0 ' : '-translate-x-full '
      } md:relative `}
    >
      <div className="h-16 flex flex-row items-center px-4 md:hidden">
        <button
          className="bg-brand-orange p-1 rounded-md hover:bg-brand-orange-hover duration-200 transition-colors"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
      </div>
      <div className="flex flex-col w-full h-full bg-dark-gray justify-between p-2">
        <ChatList
          currentChatId={props.currentChatId}
          chatList={props.chatList}
        />
        {user ? (
          <Logoutbutton />
        ) : (
          <LoginButton currentChatId={props.currentChatId} />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
