import { cookies } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getUser } from '../../../database/users';
import ChatInput from '../../chat/[chatId]/ChatInput';

export default async function ChatIdPage() {
  // 1️⃣ Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2️⃣ Query the current user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie.value));

  // 3️⃣ If user doesn't exist, redirect to login page
  if (!user) {
    redirect(`/login`);
  }

  return (
    <div className="flex-1 justify-between flex flex-col pl-2 lg:pl-10 pr-2 lg:pr-10  h-full max-h-[calc(100vh-6rem)]">
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
                {/* {user.username.charAt(0).toUpperCase() + user.username.slice(1)} */}
              </span>
            </div>

            {/* <span className="text-sm text-gray-600">
              {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
            </span> */}
          </div>
        </div>
      </div>
      {/* <Messages
        chatId={chatId}
        chatPartner={chatPartner}
        sessionImg={session.user.image}
        sessionId={session.user.id}
        initialMessages={initialMessages}
      /> */}

      <div className="bg-black collapse collapse-plus">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-black text-primary-content peer-checked:bg-black peer-checked:text-secondary-content font-bold flex">
          Story
        </div>
        <div className="collapse-content bg-black text-primary-content peer-checked:bg-pink peer-checked:text-secondary-content flex items-center space-x-4 overflow-y-auto">
          <Image
            src="/bs-into-the-wild.webp"
            alt="story card"
            width={148}
            height={48}
          />
          <p className="text-white text-center">
            The man used the last eight minutes of his life to fulfil his
            greatest wish.
          </p>
        </div>
      </div>
      {/* <div className="collapse w-full bg-black py-4 flex justify-center items-center">
        <input type="radio" name="my-accordion-1" defaultChecked />
        <div className="collapse-title flex items-center space-x-4 h-40 max-h-80 overflow-y-auto p-4">
          Story
          <div className="collapse-content">
            <Image
              src="/bs-into-the-wild.webp"
              alt="story card"
              width={148}
              height={48}
            />
            <p className="text-white text-center">
              Story: The man used the last eight minutes of his life to fulfil
              his greatest wish. Story: The man used the last eight minutes of
              his life to fulfil his greatest wish. Story: The man used the last
              eight minutes of his life to fulfil his greatest wish. Story: The
              man used.
            </p>
          </div>
        </div>
      </div> */}

      {/* display chat messages */}
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div className="chat-bubble">I hate you!</div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
      <ChatInput />
    </div>
  );
}
