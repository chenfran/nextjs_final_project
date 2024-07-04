import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUser } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';

export default async function Navbar() {
  const sessionCookie = cookies().get('sessionToken');
  console.log('sessionCookie:', sessionCookie);
  const user = sessionCookie && (await getUser(sessionCookie.value));
  console.log('user:', user); // OUTPUT: user: { username: 'victor' }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          <h1>black stories</h1>
        </Link>
      </div>

      <div className="flex-none gap-2">
        {user ? (
          <>
            <Link href={`/profile/${user.username}`}>{user.username}</Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href="/register">Register</Link>
            <Link
              className="btn btn-sm bg-red-900 border-red-900 text-white gap-2"
              href="/login"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
