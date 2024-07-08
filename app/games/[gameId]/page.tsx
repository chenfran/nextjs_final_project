import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGameInsecure } from '../../../database/games';
import { getValidSession } from '../../../database/sessions';
import ChatForm from './ChatForm';

type Props = {
  params: {
    gameId: string;
  };
};

export default async function GamePage(props: Props) {
  // Task: Protect the game page and redirect to login if the user is not logged in
  const sessionCookie = cookies().get('sessionToken');
  const session = sessionCookie && (await getValidSession(sessionCookie.value));
  if (!session) {
    redirect(`/login?returnTo=/games/${props.params.gameId}`);
  }

  // Task: Restrict access to the game page only if the game exists
  const singleGame = await getGameInsecure(Number(props.params.gameId));
  console.log('singleGame:', singleGame);

  if (!singleGame) {
    return (
      <div className="flex flex-col justify-center text-center pt-4">
        <h1 className="text-4xl text-red-900 font-bold mb-8">
          No game available
        </h1>
        <Link className="text-red-900" href="/games">
          Please create a new game
          <div className="flex justify-center w-full mt-10">
            <button className="btn bg-red-900 border-red-900 text-white gap-2">
              Create new game
            </button>
          </div>
        </Link>
      </div>
    );
  }

  return <ChatForm gameId={singleGame.id} />;
}
