"use client";

import DotGrid from "@/components/DotGrid";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState(theme);

  useEffect(() => {
    setMounted(true);
    setResolvedTheme(theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {resolvedTheme && <DotGrid darkMode={resolvedTheme === 'dark'} />}
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
       
      </div>
    </main>
  );
}

