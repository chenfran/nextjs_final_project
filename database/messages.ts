import { cache } from 'react';
import {
  Message,
  MessageWithUsername,
} from '../migrations/00003-createTableMessages';
import { sql } from './connect';

export const getMessages = cache(
  async (sessionToken: string, gameId: number) => {
    const messages = await sql<Message[]>`
      SELECT
        messages.*
      FROM
        messages
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = messages.user_id
          AND expiry_timestamp > now()
        )
      WHERE
        messages.game_id = ${gameId}
      ORDER BY
        messages.id
    `;
    return messages;
  },
);

export const getMessage = cache(
  async (sessionToken: string, messageId: number) => {
    const [message] = await sql<Message[]>`
      SELECT
        messages.*
      FROM
        messages
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = messages.user_id
          AND expiry_timestamp > now()
        )
      WHERE
        messages.id = ${messageId}
      ORDER BY
        messages.id
    `;
    return message;
  },
);

export const getMessagesInsecure = cache(async (gameId: number) => {
  const messages = await sql<MessageWithUsername[]>`
    SELECT
      messages.*,
      users.username
    FROM
      messages
      LEFT JOIN users ON (messages.user_id = users.id)
    WHERE
      messages.game_id = ${gameId}
    ORDER BY
      messages.id
  `;
  return messages;
});

export const createMessage = cache(
  async (sessionToken: string, gameId: number, content: string) => {
    const [message] = await sql<MessageWithUsername[]>`
      INSERT INTO
        messages (user_id, game_id, content) (
          SELECT
            user_id,
            ${gameId},
            ${content}
          FROM
            sessions
            INNER JOIN users ON (sessions.user_id = users.id)
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        messages.*,
        (
          SELECT
            username
          FROM
            users
          WHERE
            id = messages.user_id
        ) AS username
    `;
    return message;
  },
);

// export const createMessage = cache(
//   async (sessionToken: string, gameId: number, content: string) => {
//     const [message] = await sql<Message[]>`
//       INSERT INTO
//         messages (user_id, game_id, content) (
//           SELECT
//             user_id,
//             ${gameId},
//             ${content}
//           FROM
//             sessions
//           WHERE
//             token = ${sessionToken}
//             AND sessions.expiry_timestamp > now()
//         )
//       RETURNING
//         messages.*
//     `;
//     return message;
//   },
// );

// Messages can't be edited, so I won't need this feature, but I'll keep it in case I want to add it later:
export const updateMessage = cache(
  async (sessionToken: string, updatedMessage: Message) => {
    const [message] = await sql<Message[]>`
      UPDATE messages
      SET
        user_id = ${updatedMessage.userId},
        game_id = ${updatedMessage.gameId},
        content = ${updatedMessage.content},
        timestamp = ${updatedMessage.timestamp}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND messages.id = ${updatedMessage.id}
      RETURNING
        messages.*
    `;
    return message;
  },
);

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
