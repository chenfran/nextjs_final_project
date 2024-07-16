// pages/chatroom.js
export default function ChatRoom() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-black via-gray-800 to-red-500 text-white">
      <header className="p-4 bg-gradient-to-r from-red-500 to-gray-800">
        <h1 className="text-2xl">Chat Room</h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="mb-4">
          <div className="bg-gray-800 p-3 rounded mb-2">
            <p>User1: Hello, welcome to the chat!</p>
          </div>
          <div className="bg-gray-800 p-3 rounded">
            <p>User2: Thank you! Excited to be here.</p>
          </div>
        </div>
      </main>
      <footer className="p-4 bg-gray-800">
        <input
          className="w-full p-2 bg-gray-700 rounded text-white"
          placeholder="Type your message..."
        />
      </footer>
    </div>
  );
}
