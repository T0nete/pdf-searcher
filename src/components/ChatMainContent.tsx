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
  isDisabled: boolean;
};

const ChatMainContent = (props: Props) => {
  const { targetReached } = useMediaQuery(768);
  const [showPDF, setShowPDF] = React.useState(true);

  const handleShowPDF = () => {
    setShowPDF((prev) => !prev);
  };

  React.useEffect(() => {
    if (targetReached) {
      setShowPDF(false);
    }
  }, [targetReached]);

  return (
    <div className="relative flex flex-col md:flex-row h-full pb-6 gap-6">
      <div
        className={`absolute bottom-6 right-0 md:hidden z-30 ${showPDF ? 'block' : 'hidden'
          }`}
      >
        <button
          className="bg-brand-orange p-2 rounded-full hover:bg-brand-orange-hover duration-200 transition-colors"
          onClick={handleShowPDF}
          disabled={props.isDisabled}
        >
          {!showPDF ? <EyeShow /> : <EyeHide />}
        </button>
      </div>
      <div className={`w-full h-full ${showPDF ? 'block' : 'hidden'}`}>
        <PDFViewer pdfUrl={props.chatData?.pdf_url ?? ''} />
      </div>
      <div
        className={`h-full w-full ${!showPDF ? 'md:w-3/4 md:max-w-3xl' : 'hidden md:block md:max-w-md'
          } mx-auto`}
      >
        <ChatComponent
          chatId={props.chatData.id}
          fileKey={props.chatData.pdf_key ?? ''}
          className="h-full"
          showPDF={showPDF}
          handleShowPDF={handleShowPDF}
          isDisabled={props.isDisabled}
        />
      </div>
    </div>
  );
};

export default ChatMainContent;
