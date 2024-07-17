import Image from 'next/image';
import Link from 'next/link';
import { getGamesInsecure } from '../../database/games';

export default async function SideBarGameList() {
  const games = await getGamesInsecure();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black p-8 relative">
      <h1 className="text-white text-6xl mb-12 z-10">list of active games</h1>
      <div className="flex w-full max-w-6xl space-x-8 z-10">
        <div className="w-2/3">
          <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="text-white">
                <th className="px-6 py-4 text-left text-xl font-medium">
                  Game Title
                </th>
                <th className="px-6 py-4 text-left text-xl font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr
                  key={`games-${game.id}`}
                  className="border-b border-red-950"
                >
                  <td className="px-6 py-4 text-white">{game.title}</td>
                  <td className="px-6 py-4 text-white">
                    <Link
                      href={`/games/${game.id}`}
                      className="btn btn-xs bg-white text-black hover:bg-black hover:text-white"
                    >
                      join the game
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="w-1/3 flex items-start">
          <Image
            src="/black-stories-woman.webp"
            alt="Blood stains"
            width={300}
            height={300}
            className="max-h-screen"
          />
        </div> */}
        <div className="absolute top-0 right-96 mt-24 mr-16 z-0">
          <div className="relative w-72 max-w-300 min-w-160">
            <Image
              src="/blutflecken.webp"
              alt="Blood stains"
              width={300}
              height={300}
              className="max-h-screen"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
