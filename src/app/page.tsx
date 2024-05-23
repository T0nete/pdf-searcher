import React from 'react';
import FileUpload from '@/components/FileUpload';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        <Hero />
        <FileUpload />
      </div>
    </div>
  );
}
