import { cookies } from 'next/headers';
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

  // 2️⃣ Query the current user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie.value));

  // 3️⃣ If user doesn't exist, redirect to login page
  if (!user) {
    redirect(`/login`);
  }

  // 4️⃣ If user exists, render the page
  return (
    <div className="flex flex-col pt-4">
      <h1 className="text-4xl font-bold mb-8">
        {props.params.username}s' profile
      </h1>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New album is released!</h2>
          <p>Click the button to listen on Spotiwhy app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
}
