'use client';

import ChatComponent from '@/components/ChatComponent';
import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <div>
      <FileUpload />
      <ChatComponent />
    </div>
  );
}
