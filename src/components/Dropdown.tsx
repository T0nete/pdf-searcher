import React from 'react';
import Elipsis from './icons/Elipsis';

interface Props {
  onOpenChange: (isOpen: boolean) => void;
}
export default function Dropdown(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      props.onOpenChange(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    props.onOpenChange(!isOpen);
  };

  return (
    <div className={`relative flex text-left`} ref={dropdownRef}>
      <button
        type="button"
        className="w-full rounded-md hover:scale-110"
        onClick={toggleDropdown}
      >
        <Elipsis />
      </button>
      {isOpen && (
        <div className="z-50 origin-top-left absolute mt-6 w-48 rounded-md shadow-lg bg-light-gray ring-1 ring-dark py-1">
          <button
            key={'1'}
            className="block px-4 py-2 text-sm text-white hover:bg-light-gray-hover w-full text-left"
          >
            Change Title
          </button>
          <button
            key={'2'}
            className="block px-4 py-2 text-sm text-red-700 hover:font-bold hover:bg-light-gray-hover w-full text-left"
          >
            Delete Chat
          </button>
        </div>
      )}
    </div>
  );
}
