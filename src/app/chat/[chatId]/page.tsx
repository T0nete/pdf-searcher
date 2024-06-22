import React from 'react';
import BlurBackground from '@/components/DarkBackground';
import { getChatsByIp, getChatsByUserId } from '@/lib/supabase/supabase-chats';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/serverClient';
import { Chat } from '@/types/supabase-databse';
import MainContentWrapper from '@/components/MainContentWrapper';

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
    <div className="flex flex-1 h-full relative overflow-hidden gap-2">
      <MainContentWrapper
        chatList={_chatList}
        chatData={_chatData}
        currentChatId={props.params.chatId}
      />
      <BlurBackground />
    </div>
  );
};

export default ChatPage;
