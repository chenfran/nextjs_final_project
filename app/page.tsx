import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center bg-black p-6">
      <h1 className="text-6xl text-white mb-20">black stories</h1>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img src="/bs-into-the-wild.webp" alt="Into the wild" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Into the Wild</h2>
            <span>
              <span className="font-bold">The man used</span> the last eight
              minutes of his life to fulfil his greatest wish.
            </span>
            <div className="card-actions justify-end">
              <Link
                className="btn bg-black border-black text-white hover:bg-red-950"
                href="/register"
              >
                play now
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img src="/bs-bathed-too-hot.webp" alt="Bathed too hot" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Bathed too hot</h2>
            <span>
              <span className="font-bold">A whole rescue team </span>searched
              for him. But his body was never found.
            </span>
            <div className="card-actions justify-end">
              <Link
                className="btn bg-black border-black text-white hover:bg-red-950"
                href="/register"
              >
                play now
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img src="/bs-occupied.webp" alt="Occupied" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Occupied</h2>
            <span>
              <span className="font-bold">A woman died</span> because she spent
              too much time on the phone.
            </span>
            <div className="card-actions justify-end">
              <Link
                className="btn bg-black border-black text-white hover:bg-red-950"
                href="/register"
              >
                play now
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
