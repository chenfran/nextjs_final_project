import Image from 'next/image';
import Link from 'next/link';
import { getGamesInsecure } from '../../database/games';

export default async function SideBarGameList() {
  const games = await getGamesInsecure();

  return (
    <div className="flex flex-col items-center justify-start h-full bg-black p-4 md:p-8 relative">
      <h1 className="text-white text-3xl md:text-6xl mb-6 md:mb-12 z-20">
        list of active games
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-6xl md:space-x-8 z-20">
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <table className="min-w-full rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="text-white">
                <th className="px-4 md:px-6 py-2 md:py-4 text-left text-lg md:text-xl font-medium">
                  Game Title
                </th>
                <th className="px-4 md:px-6 py-2 md:py-4 text-left text-lg md:text-xl font-medium">
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
                  <td className="px-4 md:px-6 py-2 md:py-4 text-white text-md md:text-lg">
                    {game.title}
                  </td>
                  <td className="px-4 md:px-6 py-2 md:py-4 text-white">
                    <Link
                      href={`/games/${game.id}`}
                      className="btn btn-sm bg-white text-black hover:bg-black hover:text-white"
                    >
                      join the game
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute md:relative top-0 md:top-auto right-0 md:right-auto mt-24 md:mt-0 mr-16 md:mr-0 z-0 flex justify-center md:justify-end md:w-1/3">
          <div className="hidden md:block relative w-48 md:w-72 max-w-300 min-w-160">
            <Image
              src="/black-stories-woman.webp"
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
