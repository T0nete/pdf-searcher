'use client';

import React from 'react';
import ChatComponent from '@/components/ChatComponent';
import PDFViewer from '@/components/PDFViewer';
import { Chat } from '@/types/supabase-databse';
import EyeHide from '@/components/icons/EyeHide';
import EyeShow from '@/components/icons/EyeShow';

type Props = {
  chatData: Chat;
};
const ChatMainContent = (props: Props) => {
  const [showPDF, setShowPDF] = React.useState(true);

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

  const handleShowPDF = () => {
    setShowPDF(!showPDF);
  };

  return (
    <div className="relative flex flex-col md:flex-row h-full pb-6 gap-6">
      {showPDF ? (
        <div className="absolute bottom-6 right-0 md:hidden">
          <button
            className="bg-brand-orange p-2 rounded-full hover:bg-brand-orange-hover duration-200 transition-colors"
            onClick={handleShowPDF}
          >
            {showPDF ? <EyeHide /> : <EyeShow />}
          </button>
        </div>
      ) : null}
      <div className={`w-full h-full ${showPDF ? 'block' : 'hidden '}`}>
        <PDFViewer pdfUrl={props.chatData?.pdf_url ?? ''} />
      </div>
      <div
        className={` h-full w-full ${
          showPDF ? 'hidden md:block md:max-w-md' : 'md:w-3/4 md:max-w-3xl'
        }  mx-auto `}
      >
        <ChatComponent
          chatId={props.chatData.id}
          fileName={props.chatData.pdf_file_name ?? ''}
          className="h-full"
          showPDF={showPDF}
          handleShowPDF={handleShowPDF}
        />
      </div>
    </div>
  );
};

export default ChatMainContent;