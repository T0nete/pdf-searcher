'use client';

import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Messages } from '@/../types/supabase-databse';
import MessageList from './MessageList';
import Submit from '@/components/icons/Submit';
import EyeHide from './icons/EyeHide';
import EyeShow from './icons/EyeShow';

interface ChatComponentProps {
  chatId: number;
  fileName: string;
  className?: string;
  showPDF: boolean;
  handleShowPDF: () => void;
}
const ChatComponent = (props: ChatComponentProps) => {
  const [initialMessages, setInitialMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const chatId = encodeURIComponent(props.chatId);
      const { data } = await axios.get('/api/messages', { params: { chatId } });

      if (!data.success) {
        toast.error(data.message);
        return;
      }
      const formattedMessages = data.messages.map((m: Messages) => ({
        id: m.id,
        content: m.message,
        role: m.sender === 'user' ? 'user' : 'assistant',
      }));
      setInitialMessages(formattedMessages);
    };

    fetchMessages();
  }, [props.chatId]);

  const {
    messages: chatMessages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat({
    api: '/api/chat',
    body: { chatId: props.chatId, fileName: props.fileName },
    initialMessages,
  });

  return (
    <div className={cn('flex flex-col stretch justify-end', props.className)}>
      <div className={`"my-2 overflow-y-auto max-h-[85vh]`}>
        <MessageList chatMessages={chatMessages} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <input
          className="w-full p-2 bg-dark-gray border border-light-gray rounded shadow-xl focus:border-brand-orange focus:outline-none"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="bg-brand-orange hover:bg-brand-orange-hover transition-colors duration-200 rounded-full p-2"
          onClick={props.handleShowPDF}
        >
          {props.showPDF ? <EyeHide /> : <EyeShow />}
        </button>
        <button
          type="submit"
          className="bg-brand-orange hover:bg-brand-orange-hover transition-colors duration-200 rounded-full p-2"
        >
          <Submit />
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
