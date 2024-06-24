import React from 'react';
import Elipsis from './icons/Elipsis';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Props {
  chatId: number
  fileName: string
  isLoading: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleIsLoading: (value: boolean) => void;
}
export default function Dropdown(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const handleRemoveChat = async () => {
    try {
      props.handleIsLoading(true);
      const res = await axios.delete('/api/chat', {
        data: {
          chatId: props.chatId,
          fileKey: props.fileName,
        },
      });

      toast.success('Chat removed successfully!');
      setIsOpen(false);
      props.onOpenChange(false);

      router.push('/chat');
    } catch (error) {
      toast.error('Error deleting chat.');
    } finally {
      props.handleIsLoading(false);
    }
  }

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
            type='submit'
            key='delete-chat'
            className="block px-4 py-2 text-sm font-semibold text-red-500 hover:font-bold hover:bg-light-gray-hover w-full text-left"
            onClick={handleRemoveChat}
            disabled={props.isLoading}
          >
            Delete Chat
          </button>
          {/* </form> */}
        </div>
      )}
    </div>
  );
}
