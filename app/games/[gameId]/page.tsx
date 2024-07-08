import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGameInsecure } from '../../../database/games';
import { getValidSession } from '../../../database/sessions';
import { getUser } from '../../../database/users';
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

  return (
    <div className="flex-1 justify-between flex flex-col pl-2 lg:pl-10 pr-2 lg:pr-10">
      <h1 className="text-4xl font-bold">Play the game</h1>
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                className="rounded-full"
                src="/profile-image-placeholder.webp"
                alt="profile picture"
                fill
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center">
              <span className="text-gray-700 mr-3 font-semibold anton-font">
                {user.username}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ChatForm gameId={singleGame.id} />
    </div>
  );
}
