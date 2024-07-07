import { Message } from 'ai';

type Props = {
  chatMessages: Message[];
};

const MessageList = (props: Props) => {
  if (!props.chatMessages) {
    return null;
  }
  return (
    <div>
      {props.chatMessages.map((m) => (
        <div
          key={m.id}
          className={`flex whitespace-pre-wrap mb-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
        >
          <p
            className={`rounded-md py-2 px-4 ${m.role === 'user'
              ? 'justify-end bg-brand-orange border border-brand-orange text-white'
              : 'text-start bg-dark-gray border border-light-gray'
              }`}
          >
            {m.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
