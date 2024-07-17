'use client';

import { useRouter } from 'next/navigation';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        formAction={async () => {
          await logout();
          router.refresh();
        }}
        className="mr-5 btn btn-sm border-red-950 bg-red-950 text-white hover:bg-red-500 hover:border-red-500"
      >
        logout
      </button>
    </form>
  );
}
