import { cache } from 'react';
import { Game } from '../migrations/00002-createTableGames';
import { sql } from './connect';

export const getGames = cache(async (sessionToken: string) => {
  const games = await sql<Game[]>`
    SELECT
      games.*
    FROM
      games
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND expiry_timestamp > now()
      )
  `;
  return games;
});

export const createGame = cache(
  async (sessionToken: string, newGame: Omit<Game, 'id'>) => {
    const [game] = await sql<Game[]>`
      INSERT INTO
        games (
          user_id,
          title,
          story,
          solution,
          remaining_timestamp
        ) (
          SELECT
            ${newGame.userId},
            ${newGame.title},
            ${newGame.story},
            ${newGame.solution},
            ${newGame.remainingTimestamp}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        games.*
    `;
    return game;
  },
);

export const updateGame = cache(
  async (sessionToken: string, updatedGame: Game) => {
    const [game] = await sql<Game[]>`
      UPDATE games
      SET
        user_id = ${updatedGame.userId},
        title = ${updatedGame.title},
        story = ${updatedGame.story},
        solution = ${updatedGame.solution},
        remaining_timestamp = ${updatedGame.remainingTimestamp}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND games.id = ${updatedGame.id}
      RETURNING
        games.*
    `;
    return game;
  },
);

export const deleteGame = cache(async (sessionToken: string, id: number) => {
  const [game] = await sql<Game[]>`
    DELETE FROM games USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND games.id = ${id}
    RETURNING
      games.*
  `;

  return game;
});
