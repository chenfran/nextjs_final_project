import { Sql } from 'postgres';

export type Message = {
  id: number;
  senderId: number;
  gameId: number;
  body: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE messages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      sender_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      game_id integer NOT NULL REFERENCES games (id) ON DELETE cascade,
      body text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE messages`;
}
