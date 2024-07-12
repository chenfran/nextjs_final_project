import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGameInsecure } from '../../../database/games';
import { getMessagesInsecure } from '../../../database/messages';
import { getValidSession } from '../../../database/sessions';
import { getUser, getUserWithId } from '../../../database/users';
import TextAvatar from '../../components/TextAvatar';
import ChatForm from './ChatForm';

type Props = {
  params: {
    gameId: string;
  };
};

export default async function GamePage(props: Props) {
  // Protect the game page and redirect to login if the user is not logged in
  const sessionCookie = cookies().get('sessionToken');
  const session = sessionCookie && (await getValidSession(sessionCookie.value));
  if (!session) {
    redirect(`/login?returnTo=/games/${props.params.gameId}`);
  }

  // Check if the user exist
  const user = await getUser(sessionCookie.value);
  if (!user) {
    redirect(`/login`);
  }

  // Restrict access to the game page only if the game exists
  const singleGame = await getGameInsecure(Number(props.params.gameId));
  console.log('singleGame:', singleGame);

  if (!singleGame) {
    return (
      <div className="flex flex-col justify-center text-center pt-4">
        <h1 className="text-4xl text-red-900 font-bold mb-8">
          No game available
        </h1>
        <Link className="text-red-900 mb-8" href="/games">
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

  // Get user ID
  const userId = await getUserWithId(sessionCookie.value);
  if (!userId) {
    redirect(`/login`);
  }

  // Get game ID
  const messagesWithUsernames = await getMessagesInsecure(
    Number(props.params.gameId),
  );

  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)] ml-4 mr-4">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <TextAvatar username={user.username} />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3 font-semibold">
                {user.username}
              </span>
            </div>
            <span className="text-sm text-gray-600">Welcome to the game!</span>
          </div>
        </div>
      </div>
      <ChatForm
        params={messagesWithUsernames}
        userId={user.id}
        gameId={singleGame.id}
      />
    </div>
  );
}
