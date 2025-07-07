'use client';

import DotGrid from '@/components/DotGrid';
import { useTheme } from 'next-themes';

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();

  // Render nothing on the server and on the initial client render until the theme is resolved.
  if (!resolvedTheme) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DotGrid darkMode={resolvedTheme === 'dark'} />
      <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
       
      </div>
    </main>
  );
}

