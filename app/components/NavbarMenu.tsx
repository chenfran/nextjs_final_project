import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUser } from '../../database/users';

export default async function NavbarMenu() {
  const sessionCookie = cookies().get('sessionToken');
  const user = sessionCookie && (await getUser(sessionCookie.value));

  return (
    <div className="navbar bg-black">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" href="/">
          <h1 className="text-white font-tt">black stories</h1>
        </Link>
      </div>

      <div className="navbar-end flex-none gap-2">
        {user ? (
          <>
            <div className="hidden lg:flex">
              <div className="menu menu-horizontal px-1">
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
              </div>
            </div>
            <div className="dropdown lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost text-white lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <div
                tabIndex={0}
                role="button"
                className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-52 p-2 shadow -left-32"
              >
                <Link
                  className="mr-4 mb-2 btn btn-sm border-black bg-black text-white hover:bg-white hover:text-black"
                  href={`/profile/${user.username}`}
                >
                  {user.username}s' profile
                </Link>
                <Link
                  className="mr-4 mb-2 btn btn-sm border-black bg-black text-white hover:bg-white hover:text-black"
                  href="/games"
                >
                  start new game
                </Link>
                <Link
                  className="mr-4 mb-2 btn btn-sm border-black bg-black text-white hover:bg-white hover:text-black"
                  href="/games-list"
                >
                  join games
                </Link>
                <div className="flex justify-center mb-2">
                  <LogoutButton />
                </div>
              </div>
            </div>
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
