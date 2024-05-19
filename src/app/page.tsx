'use client';

import FileUpload from '@/components/FileUpload';
import Hero from '@/components/Hero';
import { supabaseClient } from '@/lib/supabase/browserClient';
import React from 'react';

export default function Home() {
  React.useEffect(() => {
    const fetchUser = async () => {
      console.log('fetchUser');
      const user = await supabaseClient.auth.getUser();
      console.log(user);
    };
    fetchUser();
  }, []);
  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        <Hero />
        <FileUpload />
      </div>
    </div>
  );
}
