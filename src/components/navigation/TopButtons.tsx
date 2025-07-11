import React from 'react';

interface StartProps {
  mounted: boolean;
  resolvedTheme: string | undefined;
  setTheme: (theme: string) => void;
}

const TopButtons: React.FC<StartProps> = ({
  mounted,
  resolvedTheme,
  setTheme,
}) => {
  return (
    <main>
      <button
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        disabled={!mounted}
      >
        {mounted
          ? resolvedTheme === 'dark'
            ? 'Switch to Light'
            : 'Switch to Dark'
          : 'Loading Theme...'}
      </button>
    </main>
  );
};

export default TopButtons;
