'use client';

import React from 'react';
import ChatComponent from '@/components/ChatComponent';
import PDFViewer from '@/components/PDFViewer';
import ArrowLeft from '@/components/icons/ArrowLeft';
import ArrowRight from '@/components/icons/ArrowRight';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = (props: Props) => {
  const [showPDF, setShowPDF] = React.useState(true);

  return (
    <div className="flex flex-row h-full pb-6 gap-6">
      {showPDF ? (
        <div className="hidden md:block w-full">
          <PDFViewer chatId={props.params.chatId ?? ''} />
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
        <ChatComponent className="h-full" />
      </div>
    </div>
  );
};

export default ChatPage;
