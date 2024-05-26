import React from 'react';
import ChatMainContent from '@/components/ChatMainContent';
import BlurBackground from '@/components/DarkBackground';
import { getChatsByIp, getChatsByUserId } from '@/lib/supabase/supabase-chats';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/serverClient';
import { Chat } from '@/types/supabase-databse';
import Sidebar from '@/components/Sidebar';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async (props: Props) => {
  const user = await createClient().auth.getUser();
  let _chatList: Chat[] | null = null;

  if (user.data?.user?.id) {
    _chatList = await getChatsByUserId(user.data.user?.id);
  } else {
    const ip =
      headers().get('x-real-ip') ||
      headers().get('x-forwarded-for') ||
      headers().get('x-real-ip');

    if (!ip) {
      console.error('Error getting ip');
      return null;
    }
    _chatList = await getChatsByIp(ip);
  }

  const _chatData = _chatList?.find(
    (chat) => chat.id === parseInt(props.params.chatId)
  );

  return (
    <div className="flex flex-1 relative overflow-hidden gap-2">
      <Sidebar chatList={_chatList} currentChatId={props.params.chatId} />
      <main className="flex-1 overflow-auto pt-4 md:px-0">
        {_chatData ? (
          <ChatMainContent chatData={_chatData} />
        ) : (
          <div className="flex h-full justify-center items-center">
            <p className="text-white">No chat found</p>
          </div>
        )}
      </main>
      <BlurBackground />
    </div>
  );
};

export default ChatPage;
