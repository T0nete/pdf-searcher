'use client';

import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Messages } from '@/types/supabase-databse';
import MessageList from './MessageList';
import Submit from '@/components/icons/Submit';
import EyeHide from './icons/EyeHide';
import EyeShow from './icons/EyeShow';

interface ChatComponentProps {
  chatId: number;
  fileKey: string;
  className?: string;
  showPDF: boolean;
  isDisabled: boolean;
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
    body: { chatId: props.chatId, fileKey: props.fileKey },
    initialMessages,
  });

  useEffect(() => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
      messageContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  return (
    <div className={cn('flex flex-col stretch justify-end', props.className)}>
      <div id="messageContainer" className={`"my-2 overflow-y-auto`}>
        <MessageList chatMessages={chatMessages} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-row gap-2 mt-2">
        <input
          className="w-full p-2 bg-dark-gray border border-light-gray rounded shadow-xl focus:border-brand-orange focus:outline-none"
          value={input}
          placeholder="Ask something..."
          onChange={handleInputChange}
          disabled={props.isDisabled}
        />
        <button
          type="button"
          className="bg-brand-orange hover:bg-brand-orange-hover transition-colors duration-200 rounded-full p-2"
          onClick={props.handleShowPDF}
          disabled={props.isDisabled}
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
