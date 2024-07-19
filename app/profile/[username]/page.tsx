import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '../../../database/users';

export default async function UserProfile() {
  // Task: Add redirect to login page if user is not logged in

  // 1️⃣ Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2️⃣ Query the current user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie.value));

  // 3️⃣ If user doesn't exist, redirect to login page
  if (!user) {
    redirect(`/login`);
  }

  // 4️⃣ If user exists, render the page
  return (
    <div className="flex items-center justify-center h-screen relative">
      <Image
        src="/dead-astronaut.webp"
        alt="Player"
        width={800}
        height={800}
        className="ml-44 max-h-screen"
      />

      <div className="flex ml-8 space-x-36 text-white relative z-10">
        <div className="flex flex-col items-start">
          <span className="text-9xl font-bold">{user.username}s'</span>
          <div className="flex w-96">
            <Link
              className="mr-4 mt-4 px-4 py-2 bg-white text-black text-xl font-semibold rounded-md shadow-md hover:bg-black hover:text-white"
              href="/games"
            >
              start new game
            </Link>
            <Link
              className="mt-4 px-4 py-2 bg-red-950 text-white text-xl font-semibold rounded-md shadow-md hover:bg-red-500"
              href="/games-list"
            >
              join games
            </Link>
          </div>
        </div>
        <span className="text-9xl font-bold transform rotate-90 origin-top-left">
          profile
        </span>
      </div>

      <div className="absolute bg-center z-0 transform translate-x-0 translate-y-0 translate-z-0 scale-100 rotate-x-0 rotate-y-0 rotate-10 skew-x-0 skew-y-0 transform-style-preserve-3d">
        <div className="w-14vw max-w-300 min-w-160">
          <Image
            src="/blutflecken.webp"
            alt="Blood stains"
            width={300}
            height={300}
            className="max-h-screen"
          />
        </div>
      </div>
    </div>
  );
}
