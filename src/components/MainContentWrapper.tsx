'use client';

import { SidebarContext } from '@/providers/SidebarProvider';
import React from 'react';
import ChatMainContent from './ChatMainContent';
import { Chat } from '@/types/supabase-databse';
import Sidebar from './Sidebar';
import FileUpload from './FileUpload';
import LoadingIcon from './icons/LoadingIcon';

interface IMainContentWrapper {
  chatData?: Chat | undefined;
  currentChatId?: string;
  chatList: any;
}
const MainContentWrapper = (props: IMainContentWrapper) => {
  const { isSidebarOpen } = React.useContext(SidebarContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleIsLoading = (value: boolean) => {
    setIsLoading(value);
  }

  return (
    <div className="flex flex-1 relative overflow-hidden gap-2">
      {isLoading && props.currentChatId && (
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
          <LoadingIcon className='h-12 w-12 text-brand-orange' />
        </div>
      )}
      <Sidebar chatList={props.chatList} currentChatId={props.currentChatId} isLoading={isLoading} handleIsLoading={handleIsLoading} />
      <main
        className={`flex-1 overflow-auto pt-4 md:px-0 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0' : 'md:-ml-64'
          }`}
      >
        {props.chatData ? (
          <ChatMainContent chatData={props.chatData} isDisabled={isLoading} />
        ) : (
          <div className="flex h-full justify-center items-center">
            <FileUpload handleIsLoading={handleIsLoading} />
          </div>
        )}
      </main>
    </div>
  );
};

export default MainContentWrapper;
