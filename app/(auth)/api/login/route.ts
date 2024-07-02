import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  getUserWithPasswordHashInsecure,
  User,
} from '../../../../database/users';
import { userSchema } from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

export type LoginResponseBodyPost =
  | {
      user: Pick<User, 'username'>;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // Task: Implement the user login workflow

  // 1️⃣ Get the user data from the request
  const body = await request.json();

  // 2️⃣ Validate the user data with zod
  const result = userSchema.safeParse(body);
  console.log(result.error?.issues); // OUTPUT: [{code: 'too_small', minimum: 3, type: 'string', inclusive: true, exact: false, message: 'String must contain at least 3 character(s)', path: [ 'username' ]},{code: 'too_small', minimum: 3, type: 'string', inclusive: true, exact: false, message: 'String must contain at least 3 character(s)', path: [ 'password' ]}]

  // If there is no success or the success is false, return the error:
  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
  }

  // 3️⃣ Verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
  );
  console.log('userWithPasswordHash:', userWithPasswordHash); // OUTPUT: userWithPasswordHash: {id: 1, username: 'Victor', passwordHash: '$2b$12$PF8RpayXLer3IbQhrjTW/OFnnxxxPDuEvEeryB6AWKzi1m.EH3Hr.'}

  // If the user does not exist, return the error:
  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Username or password not valid' }] },
      { status: 500 },
    );
  }

  // 4️⃣ Validate the user password by comparing with hashed password
  const passwordHash = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );
  console.log('password:', result.data.password); // OUTPUT: password: 1234
  console.log('passwordHash:', userWithPasswordHash.passwordHash); // OUTPUT: passwordHash: $2b$12$PF8RpayXLer3IbQhrjTW/OFnnxxxPDuEvEeryB6AWKzi1m.EH3Hr.
  console.log('isMatch:', passwordHash); // OUTPUT: isMatch: true

  // If the password does not exist, return the error:
  if (!passwordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Username or password not valid' }] },
      { status: 500 },
    );
  }

  // 5️⃣ Create a token
  const token = crypto.randomBytes(100).toString('base64');
  console.log('token:', token); // OUTPUT: token: kJX0JDzvK4xkfkFfngiIWIIigoEFUhL+/vqFxidIG7L1iAijya3pKJLLWCVUuYReiVnmNRHU4DrJ6YfgzUtzE21/3wkvFz7xjgyGrGldIHFOstSa1PoyPTVNX53330KFZbu5Kg==
  console.log('tokenLength:', token.length); // OUTPUT: tokenLength: 136

  // 6️⃣ Create the session record
  const session = await createSessionInsecure(token, userWithPasswordHash.id);
  console.log('sessions:', session); // OUTPUT: sessions: {id: 1, token: 'Une/9JqL4bHt1uTUACVKuWhRjv4BAlI6Yz/wQmuYkGQbR7I9gq3VUR8jYhsFtBE5/CkeG+wF4Cl82tlaACU7B8Mvpspz3b6B3IJ2E4Hbp4k4l3QPmuzJrdttb7eeljnKI8PqMg==', userId: 1}

  // If there is no session, return the error:
  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Sessions creation failed' }] },
      { status: 401 },
    );
  }

  // 7️⃣ Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 8️⃣ Return the new user information without the password hash
  return NextResponse.json({
    user: { username: userWithPasswordHash.username },
  });
}
