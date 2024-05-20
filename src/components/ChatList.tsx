import { Chat } from '@/types/supabase-databse';
import React from 'react';

type Props = {
  currentChatId: string;
  chatList: Chat[];
};

const ChatList = (props: Props) => {
  return (
    <div className="flex flex-col w-full h-full bg-dark-gray">
      {props.chatList.map((chat) => (
        <div
          key={chat.id}
          className={`flex items-center justify-between p-3 cursor-pointer ${
            props.currentChatId === chat.id.toString() ? 'bg-dark-300' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-dark-200 rounded-full"></div>
            <div>
              <p className="text-sm font-semibold">Title</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
