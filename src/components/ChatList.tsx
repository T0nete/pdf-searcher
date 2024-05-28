'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarContext } from '@/providers/SidebarProvider';
import { Chat } from '@/types/supabase-databse';
import Elipsis from './icons/Elipsis';
import Dropdown from './Dropdown';

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
            className="flex items-center justify-between first:p-0 pt-1 cursor-pointer"
          >
            <div
              className={`flex items-center p-2 rounded-md w-full group ${
                props.currentChatId === chat.id.toString()
                  ? 'bg-brand-orange-hover'
                  : 'hover:bg-brand-orange-hover'
              }`}
            >
              <Link
                href={`/chat/${chat.id}`}
                onClick={toggleSidebar}
                className="flex-1 truncate"
              >
                {getChatTitle(chat.pdf_file_name, chat.id)}
              </Link>
              <Dropdown />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
