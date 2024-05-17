'use client';

import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Messages } from '@/../types/supabase-databse';

interface ChatComponentProps {
  chatId: number;
  fileName: string;
  className?: string;
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
    <div
      className={cn('flex flex-col  stretch justify-between', props.className)}
    >
      <div className="overflow-y-auto max-h-[85vh]">
        {chatMessages.map((m) => (
          <div
            key={m.id}
            className={`flex whitespace-pre-wrap mb-2 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <p
              className={`rounded-md py-2 px-4 ${
                m.role === 'user'
                  ? 'justify-end bg-brand-orange text-white'
                  : 'text-start bg-light-gray'
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-2 bg-dark-gray border border-light-gray rounded shadow-xl focus:border-brand-orange focus:outline-none"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default ChatComponent;
