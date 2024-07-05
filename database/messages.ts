import { cache } from 'react';
import { Message } from '../migrations/00003-createTableMessages';
import { sql } from './connect';

export const getMessages = cache(async (sessionToken: string) => {
  const messages = await sql<Message[]>`
    SELECT
      messages.*
    FROM
      messages
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND expiry_timestamp > now()
      )
  `;
  return messages;
});

export const createMessage = cache(
  async (sessionToken: string, newMessage: Omit<Message, 'id'>) => {
    const [message] = await sql<Message[]>`
      INSERT INTO
        messages (sender_id, game_id, body) (
          SELECT
            ${newMessage.senderId},
            ${newMessage.gameId},
            ${newMessage.body}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        messages.*
    `;
    return message;
  },
);

// Messages can't be edited, so I won't need this feature, but I'll keep it in case I want to add it later:
// export const updateMessage = cache(
//   async (sessionToken: string, updatedMessage: Message) => {
//     const [message] = await sql<Message[]>`
//       UPDATE messages
//       SET
//         sender_id = ${updatedMessage.senderId},
//         game_id = ${updatedMessage.gameId},
//         body = ${updatedMessage.body}
//       FROM
//         sessions
//       WHERE
//         sessions.token = ${sessionToken}
//         AND sessions.expiry_timestamp > now()
//         AND messages.id = ${updatedMessage.id}
//       RETURNING
//         messages.*
//     `;
//     return message;
//   },
// );

export const deleteMessage = cache(async (sessionToken: string, id: number) => {
  const [message] = await sql<Message[]>`
    DELETE FROM messages USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND messages.id = ${id}
    RETURNING
      messages.*
  `;

  return message;
});
