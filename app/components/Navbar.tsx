import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUser } from '../../database/users';
import TextAvatar from './TextAvatar';

export default async function Navbar() {
  const sessionCookie = cookies().get('sessionToken');
  console.log('sessionCookie:', sessionCookie);
  const user = sessionCookie && (await getUser(sessionCookie.value));
  console.log('user:', user); // OUTPUT: user: { username: 'victor' }

  return (
    <div className="navbar bg-gray-950">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          <h1 className="text-white font-tt">black stories</h1>
        </Link>
      </div>

      <div className="flex-none gap-2">
        {user ? (
          <>
            <Link className=" text-white" href={`/profile/${user.username}`}>
              {user.username}
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black ">
                  M
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link
                    className="justify-between"
                    href={`/profile/${user.username}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/games">New Game</Link>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
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
