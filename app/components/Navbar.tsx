import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUser } from '../../database/users';

export default async function Navbar() {
  const sessionCookie = cookies().get('sessionToken');
  const user = sessionCookie && (await getUser(sessionCookie.value));

  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          <h1 className="text-white font-tt">black stories</h1>
        </Link>
      </div>

      <div className="flex-none gap-2">
        {user ? (
          <>
            <Link
              className="mr-4 btn btn-sm border-black bg-black text-white hover:bg-white hover:text-black"
              href={`/profile/${user.username}`}
            >
              {user.username}s' profile
            </Link>
            <Link
              className="mr-4 btn btn-sm border-black bg-black text-white hover:bg-white hover:text-black"
              href="/games"
            >
              start new game
            </Link>
            <Link
              className="mr-10 btn btn-sm border-black bg-black text-white hover:bg-white hover:text-black"
              href="/games-list"
            >
              join games
            </Link>

            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              className="text-white mr-2 btn btn-sm bg-black border-white hover:bg-white hover:text-black"
              href="/register"
            >
              sign up
            </Link>
            <Link
              className="btn btn-sm bg-red-900 border-red-900 text-white gap-2 font-tt mr-8 hover:bg-red-600 hover:border-red-600"
              href="/login"
            >
              login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
