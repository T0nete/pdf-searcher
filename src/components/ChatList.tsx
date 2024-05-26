'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarContext } from '@/providers/SidebarProvider';
import { Chat } from '@/types/supabase-databse';

type Props = {
  currentChatId: string;
  chatList: Chat[];
};

const ChatList = (props: Props) => {
  const { toggleSidebar } = React.useContext(SidebarContext);
  const getChatTitle = (fileName: string | null, chatId: number) => {
    if (!fileName) return `Chat_${chatId}`;
    const fileNameArray = fileName.split('.pdf');
    return fileNameArray[0];
  };

  return (
    <div>
      <ul>
        {props.chatList.map((chat) => (
          <li
            key={chat.id}
            className={`flex items-center justify-start first:p-0 pt-1 cursor-pointer 
      }`}
          >
            <Link
              href={`/chat/${chat.id}`}
              className={`flex items-center bg p-2 rounded-md w-full ${
                props.currentChatId === chat.id.toString()
                  ? 'bg-brand-orange-hover'
                  : 'hover:bg-brand-orange-hover'
              }`}
              onClick={toggleSidebar}
            >
              <div>{getChatTitle(chat.pdf_file_name, chat.id)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
