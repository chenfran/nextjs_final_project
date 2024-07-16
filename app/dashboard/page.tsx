// pages/dashboard.js
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <header className="p-4 text-center">
        <h1 className="text-3xl">Dashboard</h1>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl mb-2 text-white">User Profile</h2>
            <p className="text-white">
              Manage your profile information and settings.
            </p>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl mb-2 text-white">Chat Rooms</h2>
            <Link className="text-red-500" href="/chatroom">
              Enter Chat Room
            </Link>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl mb-2 text-white">Settings</h2>
            <p className="text-white">
              Adjust your preferences and account settings.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
