'use client';

import SidebarProvider from '@/providers/SidebarProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Providers;
