'use client';

import { useState } from 'react';
import { Reaction } from '../../migrations/00004-createTableReactions';

export default function Reactions() {
  return (
    <>
      <button>✅</button>
      <button>❌</button>
    </>
  );
}

// import { useState } from 'react';

// type Props = {
//   messageId: number;
//   currentReactions: { emoji: string }[];
// };

// export default function Reactions({ messageId, currentReactions }: Props) {
//   const [reactions, setReactions] = useState(currentReactions);

//   const handleReaction = async (emoji: string) => {
//     const response = await fetch('/api/reactions', {
//       method: 'POST',
//       body: JSON.stringify({
//         messageId,
//         emoji,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       const data = await response.json();
//       setReactions((prev) => {
//         const existingReaction = prev.find((r) => r.emoji === emoji);

//         return [...prev];
//       });
//       return data;
//     }
//   };

//   return (
//     <div>
//       {reactions.map((reaction) => (
//         <button
//           key={`reactions-${reaction.emoji}`}
//           onClick={() => handleReaction(reaction.emoji)}
//         >
//           {reaction.emoji} {reaction.count}
//         </button>
//       ))}
//       <button onClick={() => handleReaction('✅')}>✅</button>
//       <button onClick={() => handleReaction('❌')}>❌</button>
//       <button onClick={() => handleReaction('not relevant')}>
//         not relevant
//       </button>
//     </div>
//   );
// }
