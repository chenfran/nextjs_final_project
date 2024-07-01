'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage';
import { LoginResponseBodyPost } from '../api/login/route';

export default function LoginForm() {
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

    router.push(`/profile/${data.user.username}`);
  }

  return (
    <div className="flex flex-col justify-center text-center pt-4">
      <h1 className="text-4xl font-bold mb-8">Login Page</h1>
      <form
        className="flex flex-col items-center w-full max-w-md mx-auto"
        onSubmit={async (event) => await handleLogin(event)}
      >
        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          Username
          <input
            className="grow"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4 mx-auto max-w-md w-full">
          Password
          <input
            className="grow"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <div className="flex justify-end w-full">
          <button className="btn btn-success gap-2">Login</button>
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
