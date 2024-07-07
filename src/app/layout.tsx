import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import '@fontsource/dosis';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Providers from '@/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDF Searcher',
  description: 'Turn your PDFs into conversations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-baloo container mx-auto h-dvh p-2 md:p-0 grid-white-background`}>
        <ToastContainer theme="dark" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
