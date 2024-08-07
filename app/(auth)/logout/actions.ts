'use server';

import { cookies } from 'next/headers';
import { deleteSession } from '../../../database/sessions';

export async function logout() {
  // Task: Implement the user logout workflow

  // 1️⃣ Get the session token from the cookie
  const cookieStore = cookies();
  const session = cookieStore.get('sessionToken');

  // 2️⃣ Delete the session from the database based on the token
  // If a session exists, delete it:
  if (session) await deleteSession(session.value);

  // 3️⃣ Delete the session cookie from the browser
  cookieStore.delete('sessionToken');
}
