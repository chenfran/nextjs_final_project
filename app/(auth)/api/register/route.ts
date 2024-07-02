import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  createUserInsecure,
  getUserInsecure,
  User,
} from '../../../../database/users';
import { userSchema } from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Task: Implement the user registration workflow

  // 1️⃣ Get the user data from the request
  const body = await request.json();

  // 2️⃣ Validate the user data with zod
  const result = userSchema.safeParse(body);
  console.log(result.error?.issues); // OUTPUT: [{code: 'too_small', minimum: 3, type: 'string', inclusive: true, exact: false, message: 'String must contain at least 3 character(s)', path: [ 'username' ]},{code: 'too_small', minimum: 3, type: 'string', inclusive: true, exact: false, message: 'String must contain at least 3 character(s)', path: [ 'password' ]}]

  // If there is no success or the success is false, return the error:
  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  // 3️⃣ Check if user already exist in the database
  const user = await getUserInsecure(result.data.username);
  console.log('user:', user); // OUTPUT: user: undefined

  // If there is a user, return the error:
  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'Username already taken' }] },
      { status: 401 },
    );
  }

  // ## Confirm your password here

  // 4️⃣ Hash the plain password from the user with bcrypt
  const passwordHash = await bcrypt.hash(result.data.password, 12);
  console.log('Information:', result.data.password, passwordHash); // OUTPUT: Information: 1234 $2b$12$uTBALj3tHOyjwCJXCtgjq.dEwhi7IGWck6sQKcHesK622rfSDYy3y

  // 5️⃣ Save the user information with the hashed password in the database
  const newUser = await createUserInsecure(result.data.username, passwordHash);
  console.log('User:', newUser); // OUTPUT: User: { id: 1, username: 'Victor' }

  // If there is no newUser, return the error:
  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Registration failed' }] },
      { status: 500 },
    );
  }

  // 6️⃣ Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 7️⃣ Create the session record
  const session = await createSessionInsecure(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Sessions creation failed' }] },
      { status: 401 },
    );
  }

  // 8️⃣ Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json({ user: newUser });
}
