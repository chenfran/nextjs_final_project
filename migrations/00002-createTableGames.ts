import { Sql } from 'postgres';

export type Game = {
  id: number;
  userId: number;
  title: string;
  story: string;
  solution: string | null;
  remainingTimestamp: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE games (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      title text NOT NULL,
      story text NOT NULL,
      solution text,
      remaining_timestamp integer
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE games`;
}
