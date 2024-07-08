import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '../../../database/users';

type Props = {
  params: {
    username: string;
  };
};

export default async function UserProfile(props: Props) {
  // Task: Add redirect to login page if user is not logged in

  // 1️⃣ Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');
  console.log('sessionCookie:', sessionCookie);

  // 2️⃣ Query the current user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie.value));

  // 3️⃣ If user doesn't exist, redirect to login page
  if (!user) {
    redirect(`/login`);
  }

  // 4️⃣ If user exists, render the page
  return (
    <div className="min-h-screen flex flex-col bg-gradient-custom">
      <div className="w-full bg-black py-28">
        <h1 className="text-white text-9xl text-center">
          {props.params.username}
        </h1>
      </div>
      <div className="w-full py-28">
        <div className="text-white text-9xl text-center">
          <Link
            className="btn text-white bg-black border-black mr-10"
            href="/games"
          >
            create a new game
          </Link>
        </div>
      </div>
    </div>
  );
}
