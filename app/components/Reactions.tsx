'use client';

import { useState } from 'react';

type Props = {
  messageId: number;
  userId: number;
  currentReaction: string | null;
};

export default function Reactions({
  messageId,
  userId,
  currentReaction,
}: Props) {
  const [reaction, setReaction] = useState<string | null>(currentReaction);

  const handleReaction = async (emoji: string) => {
    const response = await fetch('/api/reactions', {
      method: 'POST',
      body: JSON.stringify({
        messageId,
        userId,
        emoji,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setReaction(emoji);
    }
  };

  return (
    <div className="flex space-x-2 mt-2">
      {!reaction ? (
        <>
          <button
            className={`p-2 rounded-full ${reaction === '👍' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleReaction('👍')}
          >
            👍
          </button>
          <button
            className={`p-2 rounded-full ${reaction === '👎' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleReaction('👎')}
          >
            👎
          </button>
        </>
      ) : (
        <p>{reaction}</p>
      )}
    </div>
  );
}
