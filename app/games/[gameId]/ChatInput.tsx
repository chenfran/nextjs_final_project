'use client';

// import EmojiPicker from 'emoji-picker-react';
import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

type Props = {
  gameId: number;
};

export default function ChatInput({ gameId }: Props) {
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // textareaRef is used to focus the textarea below
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // messageTextIsEmpty is used to disable the send button when the textarea is empty
  const messageTextIsEmpty = input.trim().length === 0;

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
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

    setInput('');
    return data;
  };

  return (
    <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      {/* display chatinput */}
      <form onSubmit={handleSubmit}>
        <div>
          <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <TextareaAutosize
              ref={textareaRef}
              onKeyDown={async (event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  await handleSubmit(event);
                }
              }}
              rows={1}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type in your message"
              className="block w-full pl-2 resize-none border-0 bg-transparent text-white placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
            />
            {/* <EmojiPicker /> */}

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
                  className={`btn bg-red-900 border-red-900 text-white gap-2 ${messageTextIsEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={messageTextIsEmpty}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="text-red-500 mt-2">{errorMessage}</div>
    </div>
  );
}
