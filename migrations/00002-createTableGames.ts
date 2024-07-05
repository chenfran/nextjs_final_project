import { Sql } from 'postgres';
import { z } from 'zod';

export const gameSchema = z.object({
  title: z.string().min(3).max(100),
  story: z.string().min(5),
});

export type Game = {
  id: number;
  title: string;
  story: string;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE games (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title text NOT NULL,
      story text NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE games`;
}
