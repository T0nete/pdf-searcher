import Header from '@/components/Header';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full px-4 md:px-0">
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
