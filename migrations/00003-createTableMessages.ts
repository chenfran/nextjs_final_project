import { Sql } from 'postgres';
import { z } from 'zod';

export const messageSchema = z.object({
  content: z.string(),
});

export type Message = {
  id: number;
  userId: number;
  gameId: number;
  content: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE messages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      game_id integer NOT NULL REFERENCES games (id) ON DELETE cascade,
      content text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE messages`;
}
