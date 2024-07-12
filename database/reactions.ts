import { cache } from 'react';
import { Reaction } from '../migrations/00004-createTableReactions';
import { sql } from './connect';

export const getReactions = cache(
  async (sessionToken: string, messageId: number) => {
    const reactions = await sql<Reaction[]>`
      SELECT
        reactions.*
      FROM
        reactions
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = reactions.user_id
          AND expiry_timestamp > now()
        )
      WHERE
        reactions.message_id = ${messageId}
    `;
    return reactions;
  },
);

export const getReaction = cache(
  async (sessionToken: string, reactionId: number) => {
    const [reaction] = await sql<Reaction[]>`
      SELECT
        reactions.*
      FROM
        reactions
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = reactions.user_id
          AND expiry_timestamp > now()
        )
      WHERE
        reactions.id = ${reactionId}
    `;
    return reaction;
  },
);

export const getReactionsInsecure = cache(async (messageId: number) => {
  const reactions = await sql<Reaction[]>`
    SELECT
      reactions.*
    FROM
      reactions
    WHERE
      reactions.message_id = ${messageId}
  `;
  return reactions;
});

export const createReaction = cache(
  async (sessionToken: string, messageId: number, emoji: string) => {
    const [reaction] = await sql<Reaction[]>`
      INSERT INTO
        reactions (user_id, message_id, emoji) (
          SELECT
            user_id,
            ${messageId},
            ${emoji}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        reactions.*
    `;
    return reaction;
  },
);

export const updateReaction = cache(
  async (sessionToken: string, updatedReaction: Reaction) => {
    const [reaction] = await sql<Reaction[]>`
      UPDATE reactions
      SET
        user_id = ${updatedReaction.userId},
        message_id = ${updatedReaction.messageId},
        emoji = ${updatedReaction.emoji}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND reactions.id = ${updatedReaction.id}
      RETURNING
        reactions.*
    `;
    return reaction;
  },
);

export const deleteReaction = cache(
  async (sessionToken: string, id: number) => {
    const [reaction] = await sql<Reaction[]>`
      DELETE FROM reactions USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND reactions.id = ${id}
      RETURNING
        reactions.*
    `;

    return reaction;
  },
);
