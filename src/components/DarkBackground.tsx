import { SidebarContext } from '@/providers/SidebarProvider';
import React from 'react';

type Props = {};

const BlurBackground = (props: Props) => {
  const { isSidebarOpen, toggleSidebar } = React.useContext(SidebarContext);

  if (!isSidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black opacity-50 md:hidden z-20 cursor-pointer"
      onClick={toggleSidebar}
    />
  );
};

export default BlurBackground;
