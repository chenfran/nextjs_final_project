// pages/index.js
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white px-4">
      <div
        className="relative w-full max-w-6xl flex flex-col md:flex-row items-center rounded-lg p-6 md:p-8 bg-black bg-opacity-50 shadow-lg"
        style={{ minHeight: '80vh' }}
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <Image
            src="/landing-page.webp"
            alt="Pile of cards"
            layout="fill"
            objectFit="contain"
            className="opacity-20"
          />
        </div>
        <div className="relative z-10 flex-shrink-0 mb-6 md:mb-0 md:w-1/2">
          <Image
            src="/landing-page.webp"
            alt="Pile of cards"
            width={500}
            height={500}
            className="rounded-lg shadow-md transform scale-110"
          />
        </div>
        <div className="relative z-10 md:ml-8 text-center md:text-left md:w-1/2">
          <h1 className="text-6xl font-bold mb-4">Join the Mystery!</h1>
          <p className="mb-4 text-2xl">
            Each Black Story challenges you to ask the right questions to solve
            the enigma, piece by piece.
          </p>
          <p className="mb-6 text-2xl">
            Don't miss out on the fun - register today and start unraveling the
            mysteries!
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
              href="/register"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
