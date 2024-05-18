'use client';

import React from 'react';
import ChatComponent from '@/components/ChatComponent';
import PDFViewer from '@/components/PDFViewer';
import { getChatById } from '@/lib/supabase/supabase-chats';
import LoadingIcon from '@/components/icons/LoadingIcon';
import { toast } from 'react-toastify';
import { Chat } from '@/../types/supabase-databse';
import EyeHide from '@/components/icons/EyeHide';
import EyeShow from '@/components/icons/EyeShow';

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
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowPDF(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleShowPDF = () => {
    setShowPDF(!showPDF);
  };

  return (
    <div className="relative flex flex-col md:flex-row h-full pb-6 gap-6">
      {showPDF ? (
        <div className="absolute bottom-6 right-0 md:hidden">
          <button
            className="bg-brand-orange p-2 rounded-full hover:bg-brand-orange-hover duration-200  transition-colors"
            onClick={handleShowPDF}
          >
            {showPDF ? <EyeHide /> : <EyeShow />}
          </button>
        </div>
      ) : null}
      <div className={`w-full h-full ${showPDF ? 'block' : 'hidden'} md:block`}>
        {isLoading ? (
          <LoadingIcon className="h-12 w-12 text-brand-orange" />
        ) : (
          <PDFViewer pdfUrl={chatData?.pdf_url ?? ''} />
        )}
      </div>
      <div
        className={` h-full w-full md:max-w-md mx-auto ${
          showPDF ? 'hidden md:block' : ''
        }`}
      >
        <ChatComponent
          chatId={chatData.id}
          fileName={chatData.pdf_file_name ?? ''}
          className="h-full"
          showPDF={showPDF}
          handleShowPDF={handleShowPDF}
        />
      </div>
    </div>
  );
};

export default ChatPage;
