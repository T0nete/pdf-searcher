'use client';

import React from 'react';
import ChatComponent from '@/components/ChatComponent';
import PDFViewer from '@/components/PDFViewer';
import { Chat } from '@/types/supabase-databse';
import EyeHide from '@/components/icons/EyeHide';
import EyeShow from '@/components/icons/EyeShow';
import useMediaQuery from '@/hooks/useMediaQuery';

type Props = {
  chatData: Chat;
};

const ChatMainContent = (props: Props) => {
  const { targetReached, handleUpdateTarget } = useMediaQuery(768);

  const handleShowPDF = () => {
    handleUpdateTarget();
  };

  return (
    <div className="relative flex flex-col md:flex-row h-full pb-6 gap-6">
      <div
        className={`absolute bottom-6 right-0 md:hidden ${
          targetReached ? 'block' : 'hidden'
        }`}
      >
        <button
          className="bg-brand-orange p-2 rounded-full hover:bg-brand-orange-hover duration-200 transition-colors"
          onClick={handleShowPDF}
        >
          {targetReached ? <EyeHide /> : <EyeShow />}
        </button>
      </div>
      <div
        className={`w-full h-full ${
          targetReached ? 'block' : 'hidden md:block'
        }`}
      >
        <PDFViewer pdfUrl={props.chatData?.pdf_url ?? ''} />
      </div>
      <div
        className={`h-full w-full ${
          targetReached
            ? 'hidden md:block md:max-w-md'
            : 'md:w-3/4 md:max-w-3xl'
        } mx-auto`}
      >
        <ChatComponent
          chatId={props.chatData.id}
          fileName={props.chatData.pdf_file_name ?? ''}
          className="h-full"
          showPDF={targetReached}
          handleShowPDF={handleShowPDF}
        />
      </div>
    </div>
  );
};

export default ChatMainContent;
