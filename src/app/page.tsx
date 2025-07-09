'use client';

import DotGrid from '@/components/background/DotGrid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DotGrid darkMode={mounted ? resolvedTheme === 'dark' : false} />
      <button 
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        disabled={!mounted}
      >
        {mounted ? 
          (resolvedTheme === 'dark' ? 'Switch to Light' : 'Switch to Dark') : 
          'Loading Theme...'
        }
      </button>
    </main>
  );
}