import React from 'react';

export const SidebarContext = React.createContext({
  isSidebarOpen: false,
  toggleSidebar: () => {},
});
type Props = {
  children: React.ReactNode;
};

const LayoutProvider = (props: Props) => {
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

export default LayoutProvider;
