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
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        Page content here
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Open filtered messages
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {messages.map((message) =>
            message.emoji === '👍' ? (
              <li key={`messages-${message.id}`}>{message.content}</li>
            ) : null,
          )}
        </ul>
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
