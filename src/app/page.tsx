'use client';

import FileUpload from '@/components/FileUpload';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-col  md:flex-row justify-center items-center gap-12">
        <Hero />
        <FileUpload />
      </div>
    </div>
  );
}
