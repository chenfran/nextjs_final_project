import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createUserInsecure,
  getUserInsecure,
  User,
} from '../../../../database/users';

type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

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
      { status: 400 },
    );
  }

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
      { status: 400 },
    );
  }

  // 6. Create a token
  // 7. Create the session record
  // 8. Send the new cookie in the headers

  return NextResponse.json({ user: newUser });
}
