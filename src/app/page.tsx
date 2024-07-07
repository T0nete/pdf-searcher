import React from 'react';
import FileUpload from '@/components/FileUpload';
import Hero from '@/components/Hero';
import { createClient } from '@/lib/supabase/serverClient';
import { getLastChatByUserId } from '@/lib/supabase/supabase-chats';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { data } = await createClient().auth.getUser();

  if (data && data.user) {
    // Fetch user last chat and redirect to it
    const lastChat = await getLastChatByUserId(data.user.id);
    if (lastChat) {
      redirect(`/chat/${lastChat.id}`);
    }
  }

  return (
    <div className="flex justify-center h-full lg:max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        <div className='flex-2'>
          <Hero />
        </div>
        <div className='flex-1'>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
