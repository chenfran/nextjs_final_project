import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../database/sessions';

export default async function AnimalsPage() {
  // Task: Protect the dashboard page and redirect to login if the user is not logged in

  // 1️⃣ Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2️⃣ Check if the sessionToken cookie is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie.value));

  // 3️⃣ If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) {
    redirect(`/login?returnTo=/test`);
  }

  // SIDE NOTE: If we do not want to redirect, but want to change the content of the page with the same URL, we simply create it like this:
  // if (!session) {
  //   return <div>Not allowed</div>;
  // }

  // 4️⃣ If the sessionToken cookie is valid, allow access to dashboard page
  return <>Hello Test!</>;
}
