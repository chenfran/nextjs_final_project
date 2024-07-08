import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getGameInsecure } from '../../../database/games';
import { createMessage } from '../../../database/messages';
import { messageSchema } from '../../../migrations/00003-createTableMessages';

export type MessagesResponseBodyPost =
  | {
      message: { content: string };
    }
  | {
      error: string;
    };

type Props = {
  params: {
    gameId: string;
  };
};

export async function POST(
  props: Props,
  request: NextRequest,
): Promise<NextResponse<MessagesResponseBodyPost>> {
  // Task: Create a new message for the current logged in user

  // Get the message data from the request
  const body = await request.json();

  // Validate messages data with zod
  const result = messageSchema.safeParse(body);

  // If client sends request body with incorrect data, return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain message object',
      },
      { status: 400 },
    );
  }

  // Checking if the sessionToken cookie exists or get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  const singleGame = await getGameInsecure(Number(props.params.gameId));

  // Create a message
  const newMessage =
    sessionTokenCookie &&
    (await createMessage(
      sessionTokenCookie.value,
      singleGame?.id,
      result.data.content,
    ));

  // If the message creation fails, return an error
  if (!newMessage) {
    return NextResponse.json(
      {
        error: 'Message not created or access denied creating messages',
      },
      { status: 400 },
    );
  }

  // Return the text content of the message
  return NextResponse.json({
    message: {
      id: newMessage.id,
      userId: newMessage.userId,
      gameId: newMessage.gameId,
      content: newMessage.content,
    },
  });
}
