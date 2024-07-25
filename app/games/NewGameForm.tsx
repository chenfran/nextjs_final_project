'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface ErrorResponse {
  error: string;
}

interface GameResponse {
  game: {
    id: number;
  };
}

export default function NewGameForm() {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  // textareaRef is used to focus the textarea below
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="flex flex-col justify-start text-center pt-4 h-full">
      <h1 className="text-4xl font-bold mb-8 text-white font-tt">
        create a new game
      </h1>

      <form
        className="flex flex-col items-center w-full max-w-md mx-auto"
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/game', {
            method: 'POST',
            body: JSON.stringify({
              title,
              story,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          setErrorMessage('');

          if (!response.ok) {
            let newErrorMessage = 'Error creating game';

            try {
              const body: ErrorResponse = await response.json();
              newErrorMessage = body.error;
            } catch {}

            setErrorMessage(newErrorMessage);
            return;
          }
          const data: GameResponse = await response.json();

          setTitle('');
          setStory('');

          router.push(`/games/${data.game.id}`);
          router.refresh();
        }}
      >
        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          title
          <input
            className="grow text-lg"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </label>

        <div className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full h-24">
          description
          <TextareaAutosize
            ref={textareaRef}
            maxRows={2}
            className="block w-full pl-2 resize-none border-0 bg-transparent text-black placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
            value={story}
            onChange={(event) => setStory(event.currentTarget.value)}
          />
        </div>
        <div className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full h-24">
          solution
          <TextareaAutosize
            ref={textareaRef}
            maxRows={2}
            className="block w-full pl-2 resize-none border-0 bg-transparent text-black placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="flex justify-end w-full">
          <button className="btn bg-red-950 border-red-950 text-white gap-2 hover:bg-red-500 hover:border-red-500">
            submit
          </button>
        </div>
      </form>

      <div>{errorMessage}</div>
    </div>
  );
}
