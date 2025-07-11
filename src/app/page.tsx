'use client';

import DotGrid from '@/components/background/DotGrid';
import TopBar from '@/components/navigation/TopBar';
import TopButtons from '@/components/navigation/TopButtons';
import FirstCat from '@/components/ui/main/FirstCat';
import Start from '@/components/ui/main/Start';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col overflow-">
      <nav>
        <TopButtons
          mounted={mounted}
          resolvedTheme={resolvedTheme}
          setTheme={setTheme}
        />
      </nav>
      <DotGrid darkMode={mounted ? resolvedTheme === 'dark' : false} />
      <div>
        <Start />
        <FirstCat />
      </div>
    </main>
  );
}
