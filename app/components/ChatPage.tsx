'use client';

import { useState } from 'react';
import { MessageWithUsernameAndReaction } from '../../migrations/00003-createTableMessages';
import ChatInput from '../games/[gameId]/ChatInput';
import Messages from '../games/[gameId]/Messages';
import SideBarThumbsUpMsg from './SideBarThumbsUpMsg';

type Props = {
  initialMessages: MessageWithUsernameAndReaction[];
  gameId: number;
  userId: number;
};

export default function ChatPage({ initialMessages, gameId, userId }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen ml-4 mr-4">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <button onClick={toggleSidebar} className="btn btn-primary">
          {isSidebarOpen
            ? 'Hide Thumbs Up Messages'
            : 'Show Thumbs Up Messages'}
        </button>
      </div>
      <div className={`flex-1 overflow-y-auto ${isSidebarOpen ? 'ml-80' : ''}`}>
        <Messages params={initialMessages} userId={userId} gameId={gameId} />
      </div>
      <div className="border-t border-gray-200">
        <ChatInput gameId={gameId} />
      </div>
      {isSidebarOpen && (
        <SideBarThumbsUpMsg params={initialMessages} gameId={gameId} />
      )}
    </div>
  );
}
