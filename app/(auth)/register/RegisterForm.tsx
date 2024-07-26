'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import { RegisterResponseBodyPost } from '../api/register/route';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      return setErrors(data.errors);
    }

    router.push(`/profile/${data.user.username}`);

    router.refresh();
  }

  return (
    <div className="flex flex-col justify-start text-center pt-4 font-tt h-full">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white font-tt mb-2">
          create an account for free
        </h1>
        <span className="text-white">
          already have an account?{' '}
          <Link
            className="link link-hover text-red-600 font-semibold"
            href="/login"
          >
            login
          </Link>
        </span>
      </div>

      <form
        className="flex flex-col items-center w-full max-w-md mx-auto"
        onSubmit={async (event) => await handleRegister(event)}
      >
        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
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
        <p className=" mb-4 text-white">
          [i] username and password must contain at least 3 characters
        </p>
        <div className="flex justify-end w-full">
          <button className="btn border-white bg-black text-white gap-2 hover:bg-white hover:text-black">
            sign up
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
