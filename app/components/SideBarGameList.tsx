import Link from 'next/link';
import { getGamesInsecure } from '../../database/games';

export default async function SideBarGameList() {
  const games = await getGamesInsecure();

  return (
    <div className="absolute min-h-screen w-80 h-full p-4 flex flex-col items-start shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Games Overview</h2>
      <ul className="space-y-4">
        {games.map((game) => (
          <li className="w-full" key={`games-${game.id}`}>
            <Link href={`/games/${game.id}`}>
              <div className="flex justify-between items-center w-full p-2 bg-white rounded-lg hover:bg-gray-700 hover:text-white transition-colors">
                <span className="text-xs">{game.title}</span>
                <span className="ml-4">
                  <button className="text-xs text-white bg-gray-900 rounded px-2 py-1 hover:bg-red-950">
                    Join the game
                  </button>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
