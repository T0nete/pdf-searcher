'use client';

import FileUpload from '@/components/FileUpload';
import { useChat } from 'ai/react';

export default function Home() {
  return (
    <div>
      <FileUpload />
    </div>
  );
}
