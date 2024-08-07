import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        tt: ['TT Norms Pro', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg, #0D2127 0%, #BA2522 100%)',
      },
    },
  },
  plugins: [daisyui],
};
export default config;
