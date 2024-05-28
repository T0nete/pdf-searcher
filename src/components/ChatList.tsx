'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarContext } from '@/providers/SidebarProvider';
import { Chat } from '@/types/supabase-databse';
import Elipsis from './icons/Elipsis';

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
            className={`flex items-center justify-start first:p-0 pt-1 cursor-pointer`}
          >
            <div
              className={`flex items-center bg p-2 rounded-md w-full group ${
                props.currentChatId === chat.id.toString()
                  ? 'bg-brand-orange-hover'
                  : 'hover:bg-brand-orange-hover'
              }`}
            >
              <Link
                href={`/chat/${chat.id}`}
                onClick={toggleSidebar}
                className="w-full"
              >
                <div>{getChatTitle(chat.pdf_file_name, chat.id)}</div>
              </Link>
              <button
                className={`ml-auto group-hover:block opacity-0 group-hover:opacity-100 hover:scale-110 ${
                  props.currentChatId === chat.id.toString()
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                title="More options"
              >
                <Elipsis />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
