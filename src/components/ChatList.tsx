'use client';

import React from 'react';
import Link from 'next/link';
import { SidebarContext } from '@/providers/SidebarProvider';
import { Chat } from '@/types/supabase-databse';
import Dropdown from './Dropdown';

type Props = {
  currentChatId: string | undefined;
  chatList: Chat[];
  isLoading: boolean;
  handleIsLoading: (value: boolean) => void;
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
              {
                props.isLoading ? (
                  <Link
                    href={`/chat/${chat.id}`}
                    onClick={toggleSidebar}
                    className="flex-1 truncate"
                  >
                    {getChatTitle(chat.pdf_file_name, chat.id)}
                  </Link>
                ) : (
                  <div className="flex-1 truncate">
                    {getChatTitle(chat.pdf_file_name, chat.id)}
                  </div>
                )
              }
              <Dropdown
                chatId={chat.id}
                fileName={chat.pdf_key ?? ''}
                isLoading={props.isLoading}
                onOpenChange={(isOpen) => handleDropdownChange(isOpen, chat.id)}
                handleIsLoading={props.handleIsLoading}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
