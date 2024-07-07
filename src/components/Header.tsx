import React from 'react';
import Link from 'next/link';
import Menu from '@/components/icons/BurgerMenu';
import { cn } from '@/lib/utils';
import { SidebarContext } from '@/providers/SidebarProvider';

type HeaderProps = {
  className?: string;
};

const Header = (props: HeaderProps) => {
  const { isSidebarOpen, toggleSidebar } = React.useContext(SidebarContext);

  return (
    <header
      className={cn(
        'h-16 flex flex-row items-center border-b-2 border-b-dark-gray gap-4',
        props.className
      )}
    >
      <button
        className={`${isSidebarOpen ? 'bg-brand-orange-hover' : 'bg-brand-orange'} p-1 rounded-md hover:bg-brand-orange-hover duration-200 transition-colors`}
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <Link
        href="/chat"
        className="text-3xl text-brand-orange-hover font-bold md:px0 text-center"
      >
        PDF Searcher
      </Link>
    </header>
  );
};

export default Header;
