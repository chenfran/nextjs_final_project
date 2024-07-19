'use client';

import EmojiPicker from 'emoji-picker-react';
import { useEffect, useState } from 'react';
import { pusherClient } from '../../util/pusher';
import { toPusherKey } from '../../util/utils';

export default function EmojiPickerComponent({
  messageId,
  userId,
  currentReaction,
}) {
  const [reaction, setReaction] = useState(currentReaction);

  const handleReaction = async (emoji) => {
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

  // Use Pusher for real-time functionality:
  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`message:${messageId}`));

    const reactionHandler = (reactions) => {
      if (reactions.messageId === messageId) {
        setReaction(reactions.emoji);
      }
    };

    pusherClient.bind('incoming-reaction', reactionHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`message:${messageId}`));
      pusherClient.unbind('incoming-reaction', reactionHandler);
    };
  }, [messageId]);

  return (
    <div className="flex space-x-2 mt-2">
      {!reaction ? (
        <EmojiPicker
          reactionsDefaultOpen={true}
          onReactionClick={handleReaction}
          reactions={['1f4a9', '1f4aa', '1f4ab', '1f620']}
        />
      ) : (
        <p className="p-2 rounded-full h-10 w-10 bg-blue-500">{reaction}</p>
      )}
    </div>
  );
}
