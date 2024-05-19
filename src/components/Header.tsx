import Link from 'next/link';
import Menu from '@/components/icons/Menu';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
  toggleSidebar: () => void;
};

const Header = (props: HeaderProps) => {
  return (
    <header
      className={cn(
        'h-16 flex flex-row items-center border-b-2 border-b-dark-gray',
        props.className
      )}
    >
      <button
        className="bg-brand-orange p-1 rounded-md hover:bg-brand-orange-hover duration-200 transition-colors"
        onClick={props.toggleSidebar}
      >
        <Menu />
      </button>
      <Link
        href="/"
        className="text-3xl text-brand-orange font-bold px-4 md:px0"
      >
        PDF Searcher
      </Link>
    </header>
  );
};

export default Header;
