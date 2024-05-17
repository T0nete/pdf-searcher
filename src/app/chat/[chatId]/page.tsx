'use client';

import React from 'react';
import ChatComponent from '@/components/ChatComponent';
import PDFViewer from '@/components/PDFViewer';
import ArrowLeft from '@/components/icons/ArrowLeft';
import ArrowRight from '@/components/icons/ArrowRight';
import { getChatById } from '@/lib/supabase/supabase-chats';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { toast } from 'react-toastify';
import { Chat } from '@/../types/supabase';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = (props: Props) => {
  const [showPDF, setShowPDF] = React.useState(true);
  const [chatData, setChatData] = React.useState<Chat | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPdfUrl = async () => {
      const chatData = await getChatById(props.params.chatId ?? '');

      if (!chatData) {
        toast.error('Error getting chat data');
        return;
      }

      setChatData(chatData.data);
      setIsLoading(false);
    };

    fetchPdfUrl();
  }, [props.params.chatId]);

  if (!chatData) {
    return null;
  }

  return (
    <div className="flex flex-row h-full pb-6 gap-6">
      {showPDF ? (
        <div className="hidden md:block w-full">
          {isLoading ? (
            <LoadingIcon className="h-12 w-12 text-brand-orange" />
          ) : (
            <PDFViewer pdfUrl={chatData?.pdf_url ?? ''} />
          )}
        </div>
      ) : null}
      <div
        className={`relative w-full h-full ${
          !showPDF ? 'w-full' : 'max-w-md'
        } mx-auto`}
      >
        <div
          className="absolute top-1/2 left-0 ml-[-28px] hover:scale-125 hover:text-brand-orange transition-all duration-300 h-8 w-8 text-light-gray"
          onClick={() => setShowPDF(!showPDF)}
        >
          {showPDF ? <ArrowLeft className="" /> : <ArrowRight className="" />}
        </div>
        <ChatComponent
          fileName={chatData.pdf_file_name ?? ''}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default ChatPage;
