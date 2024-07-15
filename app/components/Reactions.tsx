'use client';

import { useEffect, useState } from 'react';
import { Reaction } from '../../migrations/00004-createTableReactions';
import { pusherClient } from '../../util/pusher';
import { toPusherKey } from '../../util/utils';

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

  // // Use Pusher for real-time functionality:
  // useEffect(() => {
  //   pusherClient.subscribe(toPusherKey(`message:${messageId}`));

  //   const reactionHandler = (reactions: Reaction) => {
  //     setReaction(reactions.emoji);
  //   };

  //   pusherClient.bind('incoming-reaction', reactionHandler);

  //   return () => {
  //     pusherClient.unsubscribe(toPusherKey(`message:${messageId}`));
  //     pusherClient.unbind('incoming-reaction', reactionHandler);
  //   };
  // }, [messageId]);

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
