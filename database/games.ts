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
        AND sessions.user_id = games.user_id
        AND expiry_timestamp > now()
      )
  `;
  return games;
});

export const getGame = cache(async (sessionToken: string, gameId: number) => {
  const [game] = await sql<Game[]>`
    SELECT
      games.*
    FROM
      games
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = games.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      games.id = ${gameId}
  `;
  return game;
});

export const getGameInsecure = cache(async (id: number) => {
  const [game] = await sql<Game[]>`
    SELECT
      *
    FROM
      games
    WHERE
      id = ${id}
  `;
  return game;
});

export const createGame = cache(
  async (sessionToken: string, title: string, story: string) => {
    const [game] = await sql<Game[]>`
      INSERT INTO
        games (user_id, title, story) (
          SELECT
            user_id,
            ${title},
            ${story}
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
        story = ${updatedGame.story}
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

export const deleteGame = cache(
  async (sessionToken: string, gameId: number) => {
    const [game] = await sql<Game[]>`
      DELETE FROM games USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND games.id = ${gameId}
      RETURNING
        games.*
    `;

    return game;
  },
);
