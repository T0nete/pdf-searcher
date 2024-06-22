import React from 'react';
import Elipsis from './icons/Elipsis';
import { toast } from 'react-toastify';
import { useFormState } from 'react-dom';
import { removeChat } from '@/actions/chatlist-action';
import { useRouter } from 'next/navigation';

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

  const [formState, action] = useFormState(
    removeChat.bind(null, { id: props.chatId, fileName: props.fileName }),
    {}
  );

  React.useEffect(() => {
    if (formState.success) {
      toast.success('Chat deleted successfully.');
      setIsOpen(false);
      props.onOpenChange(false);
    } else if (formState.success === false) {
      toast.error('Error deleting chat.');
    }
  }, [formState]);

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
      const response = await removeChat({ id: props.chatId, fileName: props.fileName }); // Asume que removeChat es tu acción del servidor
      if (response.success) {
        toast.success('Chat removed successfully');
        setIsOpen(false);
        props.onOpenChange(false);

        router.push('/chat');
      } else {
        toast.error('Error deleting chat.');
      }

    } catch (error) {
      toast.error('Error deleting chat.');
    } finally {
      props.handleIsLoading(false);
    }
  };


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    props.onOpenChange(!isOpen);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toast.warning('Temporarily disabled.');
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
          {/* <button
            key={'1'}
            className="block px-4 py-2 text-sm text-white hover:bg-light-gray-hover w-full text-left"
            onClick={onClick}
          >
            Change Title
          </button> */}
          {/* <form action={action}> */}
          <button
            type='submit'
            key={'2'}
            className="block px-4 py-2 text-sm text-red-700 hover:font-bold hover:bg-light-gray-hover w-full text-left"
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
