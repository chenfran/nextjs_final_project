import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../database/sessions';
import NewGameForm from './NewGameForm';

export default async function GamesPage() {
  // Task: Protect the games page and redirect to login if the user is not logged in

  // Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // Check if the sessionToken cookie is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie.value));

  // If the sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) {
    redirect(`/login?returnTo=/games`);
  }

  // If the sessionToken cookie is valid, allow access to dashboard page
  return <NewGameForm />;
}
