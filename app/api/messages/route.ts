import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createMessage, getMessagesInsecure } from '../../../database/messages';
import {
  Message,
  messageSchema,
} from '../../../migrations/00003-createTableMessages';
import { pusherServer } from '../../../util/pusher';
import { toPusherKey } from '../../../util/utils';

export type MessagesResponseBodyPost =
  | {
      message: { content: string };
    }
  | {
      error: string;
    };

interface RequestBody {
  gameId: string;
  content: string;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MessagesResponseBodyPost>> {
  // Task: Create a new message for the current logged in user

  // Get the message data from the request
  const body: RequestBody = await request.json();

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

  // Create a message
  const newMessage =
    sessionTokenCookie &&
    (await createMessage(
      sessionTokenCookie.value,
      Number(body.gameId),
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

  // notify all connected chat room clients
  await pusherServer.trigger(
    toPusherKey(`game:${Number(body.gameId)}`),
    'incoming-message',
    {
      id: newMessage.id,
      userId: newMessage.userId,
      gameId: newMessage.gameId,
      content: newMessage.content,
      timestamp: newMessage.timestamp,
      username: newMessage.username,
      emoji: newMessage.emoji,
    },
  );

  // Return the text content of the message
  return NextResponse.json({
    message: {
      id: newMessage.id,
      userId: newMessage.userId,
      gameId: newMessage.gameId,
      content: newMessage.content,
      timestamp: newMessage.timestamp,
      username: newMessage.username,
      emoji: newMessage.emoji,
    },
  });
}

export type MessagesResponseBodyGet =
  | {
      messages: Message[];
    }
  | {
      error: string;
    };

export type Props = {
  params: { gameId: string };
};

export async function GET(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<MessagesResponseBodyGet>> {
  // Task: Get messages to display it on the gameId page

  const sessionCookie = request.cookies.get('sessionToken');
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const messages = await getMessagesInsecure(Number(params.gameId));

  return NextResponse.json({ messages });
}
