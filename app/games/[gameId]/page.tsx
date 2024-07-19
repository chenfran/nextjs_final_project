import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGameInsecure } from '../../../database/games';
import { getMessagesInsecure } from '../../../database/messages';
import { getValidSession } from '../../../database/sessions';
import { getUser } from '../../../database/users';
import TextAvatar from '../../components/TextAvatar';
import ChatInput from './ChatInput';
import Messages from './Messages';

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

  if (!singleGame) {
    return (
      <div className="flex flex-col justify-center text-center pt-4">
        <h1 className="text-4xl text-red-500 font-bold mb-8 font-tt">
          no game available
        </h1>
        <Link className="text-red-500 mb-8 text-2xl" href="/games">
          please create a new game
          <div className="flex justify-center w-full mt-10">
            <button className="btn bg-white text-black gap-2 hover:bg-red-950 hover:text-white hover:border-red-950">
              create new game
            </button>
          </div>
        </Link>
      </div>
    );
  }

  // Get params
  const params = await getMessagesInsecure(Number(props.params.gameId));

  return (
    <div className="flex flex-col h-screen ml-4 mr-4">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <TextAvatar username={user.username} />
            </div>
          </div>
          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-white mr-3 font-semibold font-tt">
                {user.username}
              </span>
            </div>
            <span className="text-lg text-white font-tt">
              Title: {singleGame.title} - Story: {singleGame.story}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Messages params={params} userId={user.id} gameId={singleGame.id} />
      </div>

      <div className="border-t border-gray-200">
        <ChatInput gameId={singleGame.id} />
      </div>
    </div>
  );
}
