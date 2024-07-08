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
      <div>
        <h1>Restricted access</h1>
        <Link href="/games">Please create a game</Link>
      </div>
    );
  }

  return <ChatForm gameId={singleGame.id} />;
}
