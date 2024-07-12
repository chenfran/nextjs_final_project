// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { MessageWithUsername } from '../../../migrations/00003-createTableMessages';
// import TextAvatar from '../../components/TextAvatar';

// type Props = {
//   params: MessageWithUsername[];
//   userId: number;
// };

// export default function MessagesYoutube({ params, userId }: Props) {
//   const [messages, setMessages] = useState<MessageWithUsername[]>(params);
//   console.log('All messages:', params);

//   const scrollDownRef = useRef<HTMLDivElement | null>(null); // Scroll down to the new message

//   const formatTimestamp = (timestamp: Date) => {
//     const hours = timestamp.getHours().toString().padStart(2, '0');
//     const minutes = timestamp.getMinutes().toString().padStart(2, '0');
//     return `${hours}:${minutes}`;
//   }; // Get a specific format for the timestamp

//   useEffect(() => {
//     if (scrollDownRef.current) {
//       scrollDownRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]); // Scroll to the bottom when messages change

//   return (
//     <div
//       id="messages"
//       className="flex h-full flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
//     >
//       {messages.map((message, index) => {
//         console.log('reversed messages:', message);
//         const isCurrentUser = message.userId === userId;
//         const hasNextMessageFromSameUser =
//           messages[index - 1]?.userId === messages[index]?.userId;

//         return (
//           <div
//             className="chat-message"
//             key={`${message.id}-${Number(message.timestamp)}`}
//           >
//             <div
//               className={`flex items-end ${isCurrentUser ? 'justify-end' : ''}`}
//             >
//               <div
//                 className={`flex flex-col p-2 rounded space-y-2 text-base max-w-xs mx-2 ${isCurrentUser ? 'order-1 items-end' : 'order-2 items-start'}`}
//               >
//                 <span
//                   className={`px-4 py-2 rounded-lg inline-block
//               ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-900'}
//               ${!hasNextMessageFromSameUser && isCurrentUser ? 'rounded-br-none' : ''}
//               ${!hasNextMessageFromSameUser && !isCurrentUser ? 'rounded-bl-none' : ''}`}
//                 >
//                   {message.content}{' '}
//                   <span className="ml-2 text-xs text-gray-400">
//                     {formatTimestamp(message.timestamp)}
//                   </span>
//                   <p className="text-xs text-gray-500">
//                     {message.userId === userId
//                       ? 'You'
//                       : message.username
//                         ? message.username.charAt(0).toUpperCase() +
//                           message.username.slice(1)
//                         : ''}
//                   </p>
//                 </span>
//               </div>
//               <div
//                 className={`relative w-6 h-6
//                       ${isCurrentUser ? 'order-2' : 'order-1'}
//                       ${hasNextMessageFromSameUser ? 'invisible' : ''}`}
//               >
//                 <TextAvatar username={message.username} />
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       <div ref={scrollDownRef} />
//     </div>
//   );
// }
