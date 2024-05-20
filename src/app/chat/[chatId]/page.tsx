'use client';

import React from 'react';
import axios from 'axios';
import ChatMainContent from '@/components/ChatMainContent';
import BlurBackground from '@/components/DarkBackground';
import Sidebar from '@/components/Sidebar';
import { Chat } from '@/types/supabase-databse';
import { toast } from 'react-toastify';
import LoadingIcon from '@/components/icons/LoadingIcon';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [chatList, setChatList] = React.useState<Chat[]>([]);
  const [chatData, setChatData] = React.useState<Chat | null>(null);

  React.useEffect(() => {
    const fetchPdfUrl = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`/api/chats`);

      if (!data || !data.success) {
        toast.error('Error getting chat data');
        return;
      }

      const chatData = data.data.find(
        (chat: Chat) => chat.id === parseInt(props.params.chatId)
      );

      if (!chatData) {
        toast.error('Error getting chat data');
        return;
      }

      setChatData(chatData);
      setChatList(data.data);
      setIsLoading(false);
    };

    fetchPdfUrl();
  }, [props.params.chatId]);

  return (
    <div className="flex flex-1 relative overflow-hidden gap-2">
      <Sidebar currentChatId={props.params.chatId} chatList={chatList} />
      <main className="flex-1 overflow-auto pt-4 md:px-0">
        {isLoading ? (
          <div className="flex h-full justify-center items-center">
            <LoadingIcon className="h-12 w-12 text-brand-orange" />
          </div>
        ) : !chatData ? (
          <div className="flex h-full justify-center items-center">
            <p className="text-white">No chat found</p>
          </div>
        ) : (
          <ChatMainContent chatData={chatData} />
        )}
      </main>
      <BlurBackground />
    </div>
  );
};

export default ChatPage;
