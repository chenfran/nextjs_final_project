'use client';

import { useEffect, useState } from 'react';
import { MessageWithUsernameAndReaction } from '../../migrations/00003-createTableMessages';
import { pusherClient } from '../../util/pusher';
import { toPusherKey } from '../../util/utils';

type Props = {
  params: MessageWithUsernameAndReaction[];
  gameId: number;
};

export default function SideBarThumbsUpMsg({ params, gameId }: Props) {
  const [messages, setMessages] =
    useState<MessageWithUsernameAndReaction[]>(params);

  // Use Pusher for real-time functionality:
  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`game:${gameId}`));

    const messageHandler = (message: MessageWithUsernameAndReaction) => {
      console.log('Received message:', message);
      if (message.emoji === '👍') {
        setMessages((prev) => [...prev, message]);
        console.log('Added message:', message);
      }
    };

    pusherClient.bind('incoming-message', messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`game:${gameId}`));
      pusherClient.unbind('incoming-message', messageHandler);
    };
  }, [gameId]);

  return (
    <div>
      <div className="flex flex-1 flex-col-reverse overflow-y-auto">
        <div className="flex flex-col space-y-1 p-3 text-white">
          {messages.map((message) =>
            message.emoji === '👍' ? (
              <div key={`messages-${message.id}`}>{message.content}</div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}

// import { getMessagesInsecure } from '../../database/messages';

// type Props = {
//   gameId: number;
// };

// export default async function SideBarThumbsUpMsg({ gameId }: Props) {
//   const messageWithThumbsUp = await getMessagesInsecure(gameId);

//   return (
//     <div className="flex items-end">
//       <h1 className="text-white">Messages with Thumbs ups</h1>
//       <div className="flex flex-col p-2 rounded space-y-2 text-base max-w-xs mx-2">
//         <div className="px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-900">
//           {messageWithThumbsUp.map(
//             (message) =>
//               message.emoji === '👍' && (
//                 <div key={`messages-${message.id}`}>{message.content}</div>
//               ),
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
