# Nextjs Final Project

Description:

## Technologies

- Next.js
- Tailwind CSS
- DaisyUI
- Postgres.js
- Ley Migration
- bcrypt
- Pusher for real-time functionality

## Authentication

Some pages are protected with sessions and can only be accessed by authenticated users. User needs to login with username and password to be authenticated. Authenticated users can access the protected pages and perform CRUD operations on the animals.

```
export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

type Error = {
  message: string;
};

```

```
- /api/(auth)/register
  - POST   => User   | Error[]   (create user)

- /api/(auth)/login
  - POST   => User   | Error[]   (login user)
```

### Notes

Cross-Site-Scripting used in /util/cookies.ts (XSS; deutsch Webseitenübergreifendes Skripting) bezeichnet das Ausnutzen einer Computersicherheitslücke in Webanwendungen, indem Informationen aus einem Kontext, in dem sie nicht vertrauenswürdig sind, in einen anderen Kontext eingefügt werden, in dem sie als vertrauenswürdig eingestuft werden.
