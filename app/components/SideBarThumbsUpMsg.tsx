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
    <div className="fixed left-0 top-0 h-full w-80 bg-base-200 text-base-content p-4 shadow-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Thumbs Up Messages</h2>
      <ul className="space-y-2">
        {messages
          .filter((message) => message.emoji === '👍')
          .map((message) => (
            <li
              key={`messages-${message.id}`}
              className="bg-white p-2 rounded shadow"
            >
              {message.content}
            </li>
          ))}
      </ul>
    </div>
    // <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    //   {messages.map((message) =>
    //     message.emoji === '👍' ? (
    //       <li key={`messages-${message.id}`}>{message.content}</li>
    //     ) : null,
    //   )}
    // </ul>
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
