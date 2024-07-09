'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Message } from '../../../migrations/00003-createTableMessages';

type Props = {
  userId: number;
  gameId: number;
  initialMessages: Message[];
  username: string;
};

export default function ChatForm({
  userId,
  gameId,
  initialMessages,
  username,
}: Props) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [errorMessage, setErrorMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // textareaRef is used to focus the textarea below
  const router = useRouter();

  const messageTextIsEmpty = input.trim().length === 0; // messageTextIsEmpty is used to disable the send button when the textarea is empty

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-4 sm:mb-6">
      {messages.map((message) => (
        <div
          key={`messages-${message.id}`}
          className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'} mb-4`}
        >
          <div
            className={`p-2 rounded ${message.userId === userId ? 'bg-blue-200' : 'bg-gray-200'}`}
          >
            <p className="text-sm">{message.content}</p>
            <p className="text-xs text-gray-500">
              {message.userId === userId ? 'You' : ` ${username}`}
            </p>
          </div>
        </div>
      ))}

      {/* <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header">Username</div>
        <div className="chat-bubble">
          {messages.map((message) => (
            <div
              key={`messages-${message.id}`}
              className="w-full p-2 mb-2 rounded"
            >
              {message.content}
            </div>
          ))}
        </div>
      </div> */}

      <form
        className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({
              content: input,
              gameId: gameId,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          setErrorMessage('');

          if (!response.ok) {
            let newErrorMessage = 'Error creating message';

            try {
              const body = await response.json();
              newErrorMessage = body.error;
            } catch {}

            setErrorMessage(newErrorMessage);
            return;
          }

          const data = await response.json();

          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: data.message.id,
              content: data.message.content,
              userId: data.message.userId,
              gameId: data.message.gameId,
            },
          ]);

          setInput('');

          router.refresh();
        }}
      >
        <input
          className="ml-4 block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
          value={input}
          placeholder="Your message"
          onChange={(event) => setInput(event.currentTarget.value)}
        />

        <div
          onClick={() => textareaRef.current?.focus()}
          className="py-2"
          aria-hidden="true"
        >
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>

        <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrink-0">
            <button
              className="btn bg-red-900 border-red-900 text-white gap-2"
              disabled={messageTextIsEmpty}
            >
              Send
            </button>
          </div>
        </div>
      </form>

      <div>{errorMessage}</div>
    </div>
  );
}
