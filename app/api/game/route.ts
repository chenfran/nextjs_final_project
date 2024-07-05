import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createGame } from '../../../database/games';
import { gameSchema } from '../../../migrations/00002-createTableGames';

export type GamesResponseBodyPost =
  | {
      game: { story: string };
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<GamesResponseBodyPost>> {
  // Task: Create a new game for the current logged in user

  // Get the game data from the request
  const body = await request.json();

  // Validate games data with zod
  const result = gameSchema.safeParse(body);

  // If client sends request body with incorrect data, return a response with a 400 status code to the client
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain game object',
      },
      { status: 400 },
    );
  }

  // Checking if the sessionToken cookie exists or get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // Create the game
  const newGame =
    sessionTokenCookie &&
    (await createGame(
      sessionTokenCookie.value,
      result.data.title,
      result.data.story,
    ));

  // If the game creation fails, return an error
  if (!newGame) {
    return NextResponse.json(
      {
        error: 'Game not created or access denied creating games',
      },
      { status: 400 },
    );
  }

  // Return the text content of the game
  return NextResponse.json({
    game: {
      story: newGame.story,
    },
  });
}
