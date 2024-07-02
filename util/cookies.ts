export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // This is 24 hours
  sameSite: 'lax', // For cross site scripting
} as const;
