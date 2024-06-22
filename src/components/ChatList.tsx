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
  const [openDropdownId, setOpenDropdownId] = React.useState<number | null>(
    null
  );

  const getChatTitle = (fileName: string | null, chatId: number) => {
    if (!fileName) return `Chat_${chatId}`;
    const fileNameArray = fileName.split('.pdf');
    return fileNameArray[0];
  };

  const handleDropdownChange = (isOpen: boolean, chatId: number) => {
    setOpenDropdownId(isOpen ? chatId : null);
  };


  return (
    <div>
      <ul>
        {props.chatList?.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center justify-between first:p-0 pt-1 cursor-pointer"
          >
            <div
              className={`flex items-center p-2 rounded-md w-full group ${props.currentChatId === chat.id.toString() ||
                openDropdownId === chat.id
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
              <Dropdown
                chatId={chat.id}
                fileName={chat.pdf_key ?? ''}
                onOpenChange={(isOpen) => handleDropdownChange(isOpen, chat.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
