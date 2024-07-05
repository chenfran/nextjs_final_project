'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewGameForm() {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center text-center pt-4">
      <h1 className="text-4xl font-bold mb-8">Create a new game</h1>
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
          });

          setErrorMessage('');

          if (!response.ok) {
            let newErrorMessage = 'Error creating game';

            try {
              const body = await response.json();
              newErrorMessage = body.error;
            } catch (error) {
              console.log(error);
            }

            setErrorMessage(newErrorMessage);
            return;
          }
          const data = await response.json();
          console.log('data:', data); // OUTPUT: game: {story: 'dsagk adsjkf asdjfklads gjdkasfjadks'}

          setTitle('');
          setStory('');

          router.push(`/games/${data.story}`);
          router.refresh();
        }}
      >
        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          Title
          <input
            className="grow"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full h-24">
          Description
          <input
            className="grow"
            value={story}
            onChange={(event) => setStory(event.currentTarget.value)}
          />
        </label>

        <div className="flex justify-end w-full">
          <button className="btn bg-red-900 border-red-900 text-white gap-2">
            Submit
          </button>
        </div>
      </form>

      <div>{errorMessage}</div>
    </div>
  );
}
