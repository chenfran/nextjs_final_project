import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGameInsecure } from '../../../database/games';
import {
  getMessagesInsecure,
  getMessagesWithUsernamesInsecure,
} from '../../../database/messages';
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
  // Task: Protect the game page and redirect to login if the user is not logged in
  const sessionCookie = cookies().get('sessionToken');
  const session = sessionCookie && (await getValidSession(sessionCookie.value));
  if (!session) {
    redirect(`/login?returnTo=/games/${props.params.gameId}`);
  }

  // Task: Check if the user exist
  const user = await getUser(sessionCookie.value);
  if (!user) {
    redirect(`/login`);
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

  const initialMessages = await getMessagesInsecure(
    Number(props.params.gameId),
  );
  console.log('initialMessages:', initialMessages);

  const userId = await getUserWithId(sessionCookie.value);
  if (!userId) {
    redirect(`/login`);
  }

  const messagesWithUsernames = await getMessagesWithUsernamesInsecure(
    Number(props.params.gameId),
  );

  const reversedMessagesWithUsernames = messagesWithUsernames.reverse();
  console.log('reversedMessagesWithUsernames:', reversedMessagesWithUsernames);

  return (
    <div className="flex-1 flex flex-col pl-2 lg:pl-10 pr-2 lg:pr-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Play the game</h1>
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <TextAvatar username={user.username} />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold text-gray-700">
              {user.username}
            </span>
          </div>
        </div>
      </div>
      <ChatForm
        params={reversedMessagesWithUsernames}
        userId={user.id}
        gameId={singleGame.id}
      />
    </div>
  );
}
