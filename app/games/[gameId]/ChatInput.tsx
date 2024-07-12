// 'use client';

// import { useRouter } from 'next/navigation';
// import { useRef, useState } from 'react';
// import TextareaAutosize from 'react-textarea-autosize';
// import { MessageWithUsername } from '../../../migrations/00003-createTableMessages';

// type Props = {
//   params: MessageWithUsername[];
//   gameId: number;
// };

// export default function ChatInputYoutube({ params, gameId }: Props) {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<MessageWithUsername[]>(params);
//   const [errorMessage, setErrorMessage] = useState('');

//   const textareaRef = useRef<HTMLTextAreaElement | null>(null); // textareaRef is used to focus the textarea below

//   const router = useRouter();

//   const messageTextIsEmpty = input.trim().length === 0; // messageTextIsEmpty is used to disable the send button when the textarea is empty

//   const handleSubmit = async (
//     event:
//       | React.FormEvent<HTMLFormElement>
//       | React.KeyboardEvent<HTMLTextAreaElement>,
//   ) => {
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
//         timestamp: new Date(data.message.timestamp),
//       },
//     ]);

//     setInput('');
//     router.refresh();
//   };

//   return (
//     <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
//       <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
//         <TextareaAutosize
//           ref={textareaRef}
//           onKeyDown={async (event) => {
//             if (event.key === 'Enter' && !event.shiftKey) {
//               await handleSubmit(event);
//             }
//           }}
//           rows={1}
//           value={input}
//           onChange={(event) => setInput(event.target.value)}
//           placeholder="Type in your message"
//           className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
//         />
//         <div
//           onClick={() => textareaRef.current?.focus()}
//           className="py-2"
//           aria-hidden="true"
//         >
//           <div className="py-px">
//             <div className="h-9" />
//           </div>
//         </div>
//         <div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
//           <div className="flex-shrin-0">
//             <form onSubmit={handleSubmit}>
//               <button
//                 className={`btn bg-red-900 border-red-900 text-white gap-2 ${messageTextIsEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 disabled={messageTextIsEmpty}
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <div className="text-red-500 mt-2">{errorMessage}</div>
//     </div>
//   );
// }
