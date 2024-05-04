'use client';

import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';

interface ChatComponentProps {
  className?: string;
}
const ChatComponent = (props: ChatComponentProps) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div
      className={cn('flex flex-col  stretch justify-between', props.className)}
    >
      <div className="overflow-y-auto max-h-[85vh]">
        {messages.map((m) => (
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
