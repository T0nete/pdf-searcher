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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(() =>
    JSON.parse(localStorage.getItem('isSidebarOpen') || 'false')
  );

  React.useEffect(() => {
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

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
