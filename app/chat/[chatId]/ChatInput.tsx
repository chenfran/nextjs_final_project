// 'use client';

// import { useRouter } from 'next/navigation';
// import { useRef, useState } from 'react';
// import TextareaAutosize from 'react-textarea-autosize';
// import { MessageWithUsername } from '../../../migrations/00003-createTableMessages';
// import TextAvatar from '../../components/TextAvatar';

// type Props = {
//   params: MessageWithUsername[];
//   userId: number;
//   gameId: number;
// };

// export default function ChatInput({ params, userId, gameId }: Props) {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<MessageWithUsername[]>(params);
//   const [errorMessage, setErrorMessage] = useState('');
//   const textareaRef = useRef<HTMLTextAreaElement | null>(null); // textareaRef is used to focus the textarea below
//   const router = useRouter();

//   const messageTextIsEmpty = input.trim().length === 0; // messageTextIsEmpty is used to disable the send button when the textarea is empty
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const response = await fetch('/api/messages', {
//       method: 'POST',
//       body: JSON.stringify({
//         content: input,
//         gameId: gameId,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     setErrorMessage('');

//     if (!response.ok) {
//       let newErrorMessage = 'Error creating message';

//       try {
//         const body = await response.json();
//         newErrorMessage = body.error;
//       } catch {}

//       setErrorMessage(newErrorMessage);
//       return;
//     }

//     const data = await response.json();

//     setMessages((prevMessages) => [
//       ...prevMessages,
//       {
//         id: data.message.id,
//         content: data.message.content,
//         userId: data.message.userId,
//         gameId: data.message.gameId,
//         username: data.message.username,
//       },
//     ]);

//     setInput('');
//     router.refresh();
//   };

//   const scrollDownRef = useRef<HTMLDivElement | null>(null); // ❗️to scroll down to the new message
//   const sendMessage = () => {}; // ❗️maybe I can put everything that is in the form element there

//   return (
//     <div>
//       {/* display messages */}
//       <div className="flex-1 justify-between flex flex-col h-full max-h-[100vh-6rem]">
//         <div
//           id="messages"
//           className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
//         >
//           <div ref={scrollDownRef} />
//           {messages.map((message, index) => {
//             const isCurrentUser = message.userId === userId;

//             const hasNextMessageFromSameUser =
//               messages[index - 1]?.userId === messages[index]?.userId; // ❗️check if there is a same message from the same user

//             return (
//               <div
//                 key={`${message.id}-${message.timestamp}`}
//                 className="chat-message"
//               >
//                 <div
//                   className={`flex items-end ${isCurrentUser ? 'justify-end' : ''}`}
//                 >
//                   <div
//                     className={`flex flex-col space-y-2 text-base max-w-xs mx-2 ${isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}
//                   >
//                     <span
//                       className={`px-4 py-2 rounded-lg inline-block
//                       ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'}
//                       ${!hasNextMessageFromSameUser && isCurrentUser ? 'rounded-br-none' : ''}
//                       ${!hasNextMessageFromSameUser && !isCurrentUser ? 'rounded-bl-none' : ''}`}
//                     >
//                       {message.content}{' '}
//                       <span className="ml-2 text-xs text-gray-400">
//                         {formatTimestamp(message.timestamp)}
//                       </span>
//                     </span>
//                   </div>

//                   <div
//                     className={`relative w-6 h-6
//                       ${isCurrentUser ? 'order-2' : 'order-1'}
//                       ${hasNextMessageFromSameUser ? 'invisible' : ''}`}
//                   >
//                     <TextAvatar username={message.username} />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* display chatinput */}
//       <form onSubmit={handleSubmit}>
//         <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
//           <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
//             <TextareaAutosize
//               ref={textareaRef}
//               onKeyDown={(event) => {
//                 if (event.key === 'Enter' && !event.shiftKey) {
//                   event.preventDefault();
//                   sendMessage();
//                 }
//               }}
//               rows={1}
//               value={input}
//               onChange={(event) => setInput(event.target.value)}
//               placeholder={`Message ${userId}`}
//               className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
//             />

//             <div
//               onClick={() => textareaRef.current?.focus()}
//               className="py-2"
//               aria-hidden="true"
//             >
//               <div className="py-px">
//                 <div className="h-9" />
//               </div>
//             </div>

//             <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
//               <div className="flex-shrin-0">
//                 <button
//                   className={`btn bg-red-900 border-red-900 text-white gap-2 ${messageTextIsEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   disabled={messageTextIsEmpty}
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>

//       <div className="text-red-500 mt-2">{errorMessage}</div>
//     </div>
//   );
// }
