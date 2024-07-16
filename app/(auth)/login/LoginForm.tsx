'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import { LoginResponseBodyPost } from '../api/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      return setErrors(data.errors);
    }

    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.username}`,
    );

    router.refresh();
  }

  return (
    <div className="flex flex-col justify-center text-center pt-4">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white font-tt mb-2">
          create an account for free
        </h1>
        <span className="text-white">
          don't have an account?{' '}
          <Link
            className="link link-hover text-red-600 font-semibold"
            href="/register"
          >
            create an account
          </Link>
        </span>
      </div>

      <form
        className="flex flex-col items-center w-full max-w-md mx-auto"
        onSubmit={async (event) => await handleLogin(event)}
      >
        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full text-gray-700">
          username
          <input
            className="grow text-lg"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          password
          <input
            className="grow"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <div className="flex justify-end w-full">
          <button className="btn bg-red-900 border-red-900 text-white gap-2">
            Login
          </button>
        </div>

        {errors.map((error) => (
          <div key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
