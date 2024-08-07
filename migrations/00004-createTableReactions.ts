import { Sql } from 'postgres';
import { z } from 'zod';

export const reactionSchema = z.object({
  emoji: z.string(),
});

export type Reaction = {
  id: number;
  userId: number;
  messageId: number;
  emoji: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE reactions (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      message_id integer NOT NULL REFERENCES messages (id) ON DELETE cascade,
      emoji text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE reactions`;
}
