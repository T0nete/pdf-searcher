'use client';

import React from 'react';

export const SidebarContext = React.createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});
type Props = {
  children: React.ReactNode;
};

const SidebarProvider = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
