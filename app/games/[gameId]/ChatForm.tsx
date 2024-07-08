'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ChatForm() {
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center text-center pt-4">
      <h1 className="text-4xl font-bold mb-8">Play the game</h1>

      <form
        className="flex flex-col items-center w-full max-w-md mx-auto"
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({
              content: input,
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

          setInput('');

          router.refresh();
        }}
      >
        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          Your message
          <input
            className="grow"
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
          />
        </label>

        <div className="flex justify-end w-full">
          <button className="btn bg-red-900 border-red-900 text-white gap-2">
            Send
          </button>
        </div>
      </form>

      <div>{errorMessage}</div>
    </div>
  );
}
