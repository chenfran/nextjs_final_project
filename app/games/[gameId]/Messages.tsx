'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageWithUsernameAndReaction } from '../../../migrations/00003-createTableMessages';
import { pusherClient } from '../../../util/pusher';
import { formatDate, toPusherKey } from '../../../util/utils';
import Reactions from '../../components/Reactions';

type Props = {
  params: MessageWithUsernameAndReaction[];
  userId: number;
  gameId: number;
};

export default function Messages({ params, userId, gameId }: Props) {
  const [messages, setMessages] =
    useState<MessageWithUsernameAndReaction[]>(params);

  // Scroll down to the new message
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  // Scroll to the bottom when messages change
  useEffect(() => {
    if (scrollDownRef.current) {
      scrollDownRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Use Pusher for real-time functionality:
  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`game:${gameId}`));

    const messageHandler = (message: MessageWithUsernameAndReaction) => {
      setMessages((prev) => [...prev, message]);
    };

    pusherClient.bind('incoming-message', messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`game:${gameId}`));
      pusherClient.unbind('incoming-message', messageHandler);
    };
  }, [gameId]);

  return (
    <div>
      {/* display messages */}
      <div className="flex flex-1 flex-col-reverse overflow-y-auto">
        <div id="messages" className="flex flex-col space-y-1 p-3">
          {messages.map((message, index: number) => {
            const isCurrentUser = message.userId === userId;
            const hasNextMessageFromSameUser =
              messages[index - 1]?.userId === messages[index]?.userId; // Check if there is a same message from the same user

            return (
              <div
                key={`${message.id}-${Number(message.timestamp)}`}
                className="chat-message"
              >
                <div
                  className={`flex items-end ${isCurrentUser ? 'justify-end' : ''}`}
                >
                  <div
                    className={`flex flex-col p-2 rounded space-y-2 text-base max-w-xs mx-2 ${isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}
                  >
                    <span
                      className={`px-4 py-2 rounded-lg inline-block
                      ${isCurrentUser ? 'bg-red-900 text-white' : 'bg-gray-200 text-gray-900'}
                      ${!hasNextMessageFromSameUser && isCurrentUser ? 'rounded-br-none' : ''}
                      ${!hasNextMessageFromSameUser && !isCurrentUser ? 'rounded-bl-none' : ''}`}
                    >
                      {message.content}{' '}
                      <span className="ml-2 text-xs text-gray-400">
                        {formatDate(new Date(message.timestamp))}
                      </span>
                      <p className="text-xs text-gray-400">
                        {message.userId === userId
                          ? 'You'
                          : message.username
                            ? message.username.charAt(0).toUpperCase() +
                              message.username.slice(1)
                            : ''}
                      </p>
                      <Reactions
                        messageId={message.id}
                        userId={message.userId}
                        currentReaction={message.emoji}
                      />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={scrollDownRef} />
        </div>
      </div>
    </div>
  );
}
