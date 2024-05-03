import Link from 'next/link';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <header className="h-16 flex flex-row items-center">
      <Link href="/" className="text-3xl text-brand-orange font-bold">
        PDF Searcher
      </Link>
    </header>
  );
};

export default Header;
