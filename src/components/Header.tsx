import Link from 'next/link';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <header className="h-16 flex flex-row items-center border-b-2 border-b-dark-gray">
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
